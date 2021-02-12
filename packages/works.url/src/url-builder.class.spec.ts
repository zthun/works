/* eslint-disable require-jsdoc */
import { assertBuilderSetsProperty } from '@zthun/works.jest';
import { identity } from 'lodash';
import { ZUrlBuilder } from './url-builder.class';

describe('ZUrlBuilder', () => {
  let loc: Location;
  let protocol: string;
  let hostname: string;

  beforeEach(() => {
    protocol = 'https';
    hostname = 'facebook.com';

    loc = {
      ancestorOrigins: null,
      hash: '',
      host: '',
      hostname,
      href: '',
      origin: '',
      pathname: '',
      port: '',
      protocol,
      search: '',
      assign: jest.fn(),
      reload: jest.fn(),
      replace: jest.fn()
    };
  });

  function createTestTarget() {
    return new ZUrlBuilder(protocol, hostname);
  }

  describe('Parts', () => {
    it('defaults the protocol and hostname.', () => {
      const expected = 'http://localhost';
      assertBuilderSetsProperty(expected, () => new ZUrlBuilder(), identity, identity);
    });

    it('cleans the protocol.', () => {
      const expected = `${protocol}://${hostname}`;
      assertBuilderSetsProperty(expected, createTestTarget, (t) => t.protocol(`${protocol}://`), identity);
    });

    it('sets the correct host.', () => {
      const expected = `${protocol}://www.yahoo.com`;
      assertBuilderSetsProperty(expected, createTestTarget, (t) => t.hostname('www.yahoo.com'), identity);
    });

    it('cleans the host.', () => {
      const expected = `${protocol}://${hostname}`;
      assertBuilderSetsProperty(expected, createTestTarget, (t) => t.hostname(`////////${hostname}////`), identity);
    });

    it('sets the correct path.', () => {
      const expected = `${protocol}://${hostname}/a/b/c/d`;
      assertBuilderSetsProperty(expected, createTestTarget, (t) => t.append('a/b').append('/c/d/'), identity);
    });

    it('cleans the path.', () => {
      const expected = `${protocol}://${hostname}/a/b/c/d`;
      assertBuilderSetsProperty(expected, createTestTarget, (t) => t.append('////a/b/////').append('c').append('/d///'), identity);
    });

    it('sets the hash.', () => {
      const expected = `${protocol}://${hostname}/a/b#abcd`;
      assertBuilderSetsProperty(expected, createTestTarget, (t) => t.append('/a/b').hash('abcd'), identity);
    });

    it('sets the port.', () => {
      const expected = `${protocol}://${hostname}:8080`;
      assertBuilderSetsProperty(expected, createTestTarget, (t) => t.port(8080), identity);
    });

    it('ignores port 0.', () => {
      const expected = `http://${hostname}`;
      assertBuilderSetsProperty(expected, createTestTarget, (t) => t.protocol('http').port(0), identity);
    });

    it('ignores default ports.', () => {
      const expected = `http://${hostname}`;
      assertBuilderSetsProperty(expected, createTestTarget, (t) => t.protocol('http').port(80), identity);
    });

    it('adds the search.', () => {
      const expected = `${protocol}://${hostname}/?paramA=a&paramB=b`;
      assertBuilderSetsProperty(expected, createTestTarget, (t) => t.param('paramA', 'a').param('paramB', 'b'), identity);
    });

    it('adds a subdomain.', () => {
      const expected = `${protocol}://mail.${hostname}`;
      assertBuilderSetsProperty(expected, createTestTarget, (t) => t.subdomain('mail'), identity);
    });

    it('sets the domain as the host if the host is not set.', () => {
      const expected = `${protocol}://mail`;
      assertBuilderSetsProperty(expected, createTestTarget, (t) => t.hostname('').subdomain('mail'), identity);
    });

    it('encodes the parameter values.', () => {
      const valA = 'ab&cd&e//fg';
      const expected = `${protocol}://${hostname}/?paramA=${encodeURIComponent(valA)}`;
      assertBuilderSetsProperty(expected, createTestTarget, (t) => t.param('paramA', valA), identity);
    });

    it('sets the user.', () => {
      const expected = `${protocol}://user@${hostname}`;
      assertBuilderSetsProperty(expected, createTestTarget, (t) => t.username('user'), identity);
    });

    it('sets the password.', () => {
      const expected = `${protocol}://user:password@${hostname}`;
      assertBuilderSetsProperty(expected, createTestTarget, (t) => t.username('user').password('password'), identity);
    });

    it('ignores the password if the user is not set.', () => {
      const expected = `${protocol}://${hostname}`;
      assertBuilderSetsProperty(expected, createTestTarget, (t) => t.password('password'), identity);
    });
  });

  describe('Parsing', () => {
    it('correctly parses a url.', () => {
      const expected = 'https://user:password@www.google.com:9086/foo/bar/?valA=a&valB=b#hhh';
      assertBuilderSetsProperty(expected, createTestTarget, (t, v) => t.parse(v), identity);
    });

    it('supports partial uri values.', () => {
      // Arrange
      const expected = '/foo/bar/?valA=a&valB=b#hhh';
      const target = createTestTarget();
      // Act
      const actual = target.parse(expected).build();
      // Assert
      expect(actual.endsWith(expected)).toBeTruthy();
    });

    it('can be modified.', () => {
      // Arrange
      const url = 'https://google.com:9086/foo/bar#hhh';
      const expected = 'http://user:password@mail.google.com:9099/a/b/c/?valA=c&valB=d#h32';
      assertBuilderSetsProperty(expected, createTestTarget, (t) => t.parse(url).protocol('http').port(9099).path('a').append('b/c').param('valA', 'c').param('valB', 'd').hash('h32').username('user').password('password').subdomain('mail'), identity);
    });

    it('can be modified to use a different port.', () => {
      // Arrange
      const url = 'https://www.google.com';
      const expected = 'https://www.google.com:9999';
      assertBuilderSetsProperty(expected, createTestTarget, (t) => t.parse(url).port(9999), identity);
    });
  });

  describe('Location', () => {
    it('initializes with the default location.', () => {
      // Arrange
      const target = createTestTarget();
      // Act
      const actual = target.location().build();
      // Assert
      expect(actual).toBeTruthy();
    });

    it('it constructs the search params.', () => {
      // Arrange
      const target = createTestTarget();
      loc.search = '?a=b';
      // Act
      const actual = target.location(loc).build();
      // Assert
      expect(actual.endsWith('a=b')).toBeTruthy();
    });
  });

  describe('API', () => {
    it('initializes with the default parameters.', () => {
      // Arrange
      const target = createTestTarget();
      // Act
      const actual = target.api().build();
      // Assert
      expect(actual).toBeTruthy();
    });

    it('replaces the path with the basePath', () => {
      // Arrange
      const target = createTestTarget();
      // Act
      const actual = target.api(loc, 'api').build();
      // Assert
      expect(actual.endsWith('api')).toBeTruthy();
    });
  });

  describe('Gravatar', () => {
    it('returns the base gravatar url.', () => {
      assertBuilderSetsProperty(ZUrlBuilder.UrlGravatar, createTestTarget, (t) => t.gravatar(), identity);
    });

    it('adds the hashed email and size.', () => {
      const hash = 'd41d8cd98f00b204e9800998ecf8427e';
      const size = 256;
      const expected = createTestTarget().parse(ZUrlBuilder.UrlGravatar).append(hash).param('s', `${size}`).build();
      assertBuilderSetsProperty(expected, createTestTarget, (t) => t.gravatar(hash, size), identity);
    });
  });
});
