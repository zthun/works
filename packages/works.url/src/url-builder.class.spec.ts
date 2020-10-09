/* eslint-disable require-jsdoc */
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
    return new ZUrlBuilder();
  }

  function assertBuildsUrl(expected: string, buildFn: (target: ZUrlBuilder) => ZUrlBuilder) {
    // Arrange
    const target = new ZUrlBuilder(protocol, hostname);
    // Act
    const actual = buildFn(target).build();
    // Assert
    expect(actual).toEqual(expected);
  }

  describe('Parts', () => {
    it('sets the correct protocol.', () => {
      const expected = `${protocol}://${hostname}`;
      assertBuildsUrl(expected, (t) => t.protocol(protocol));
    });

    it('cleans the protocol.', () => {
      const expected = `${protocol}://${hostname}`;
      assertBuildsUrl(expected, (t) => t.protocol(`${protocol}://`));
    });

    it('sets the correct host.', () => {
      const expected = `${protocol}://www.yahoo.com`;
      assertBuildsUrl(expected, (t) => t.hostname('www.yahoo.com'));
    });

    it('cleans the host.', () => {
      const expected = `${protocol}://${hostname}`;
      assertBuildsUrl(expected, (t) => t.hostname(`////////${hostname}////`));
    });

    it('sets the correct path.', () => {
      const expected = `${protocol}://${hostname}/a/b/c/d`;
      assertBuildsUrl(expected, (t) => t.append('a/b').append('/c/d/'));
    });

    it('cleans the path.', () => {
      const expected = `${protocol}://${hostname}/a/b/c/d`;
      assertBuildsUrl(expected, (t) => t.append('////a/b/////').append('c').append('/d///'));
    });

    it('sets the hash.', () => {
      const expected = `${protocol}://${hostname}/a/b#abcd`;
      assertBuildsUrl(expected, (t) => t.append('/a/b').hash('abcd'));
    });

    it('sets the port.', () => {
      const expected = `${protocol}://${hostname}:8080`;
      assertBuildsUrl(expected, (t) => t.port(8080));
    });

    it('ignores port 0.', () => {
      const expected = `http://${hostname}`;
      assertBuildsUrl(expected, (t) => t.protocol('http').port(0));
    });

    it('ignores default ports.', () => {
      const expected = `http://${hostname}`;
      assertBuildsUrl(expected, (t) => t.protocol('http').port(80));
    });

    it('adds the search.', () => {
      const expected = `${protocol}://${hostname}/?paramA=a&paramB=b`;
      assertBuildsUrl(expected, (t) => t.param('paramA', 'a').param('paramB', 'b'));
    });

    it('adds a subdomain.', () => {
      const expected = `${protocol}://mail.${hostname}`;
      assertBuildsUrl(expected, (t) => t.subdomain('mail'));
    });

    it('sets the domain as the host if the host is not set.', () => {
      const expected = `${protocol}://mail`;
      assertBuildsUrl(expected, (t) => t.hostname('').subdomain('mail'));
    });

    it('encodes the parameter values.', () => {
      const valA = 'ab&cd&e//fg';
      const expected = `${protocol}://${hostname}/?paramA=${encodeURIComponent(valA)}`;
      assertBuildsUrl(expected, (t) => t.param('paramA', valA));
    });

    it('sets the user.', () => {
      const expected = `${protocol}://user@${hostname}`;
      assertBuildsUrl(expected, (t) => t.username('user'));
    });

    it('sets the password.', () => {
      const expected = `${protocol}://user:password@${hostname}`;
      assertBuildsUrl(expected, (t) => t.username('user').password('password'));
    });

    it('ignores the password if the user is not set.', () => {
      const expected = `${protocol}://${hostname}`;
      assertBuildsUrl(expected, (t) => t.password('password'));
    });
  });

  describe('Parsing', () => {
    it('correctly parses a url.', () => {
      // Arrange
      const url = 'https://user:password@www.google.com:9086/foo/bar/?valA=a&valB=b#hhh';
      const target = createTestTarget();
      // Act
      const actual = target.parse(url).build();
      // Assert
      expect(actual).toEqual(url);
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
      const target = createTestTarget();
      // Act
      const actual = target.parse(url).protocol('http').port(9099).path('a').append('b/c').param('valA', 'c').param('valB', 'd').hash('h32').username('user').password('password').subdomain('mail').build();
      // Assert
      expect(actual).toEqual(expected);
    });

    it('can be modified to use a different port.', () => {
      // Arrange
      const url = 'https://www.google.com';
      const expected = 'https://www.google.com:9999';
      const target = createTestTarget();
      // Act
      const actual = target.parse(url).port(9999).build();
      // Assert
      expect(actual).toEqual(expected);
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
});
