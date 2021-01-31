import { trim, trimEnd, trimStart } from 'lodash';
import URLParse from 'url-parse';

/**
 * Represents an object that is helpful in building a url.
 */
export class ZUrlBuilder {
  /**
   * The url to the gravatar api.
   */
  public static UrlGravatar = 'https://s.gravatar.com/avatar';

  /**
   * The url to a github page.
   */
  public static UrlGithub = 'https://github.com';

  /**
   * A mapping between protocol and default port.
   */
  public static ProtocolPorts = {
    http: 80,
    https: 443,
    ftp: 21,
    sftp: 22,
    ssh: 22,
    smtp: 25,
    smb: 445
  };

  /**
   * Gets whether the given protocols default port is port.
   *
   * The main purpose of this method is to determine if a url requires
   * a port section.  Therefore, there are some special behaviors which may
   * not be obvious:
   *
   * 1.  If the port is falsy then this method returns true.
   * 2.  If the port is NaN, then this method returns true.
   * 3.  If the port is a string that evaluates to 0, then this method returns true.
   * 4.  If port is less than 0, then this method returns true.
   *
   * @param protocol The protocol to check.
   * @param port The port to compare.
   *
   * @returns True if the default port for protocol is port.
   */
  public static defaults(protocol: string, port: string | number): boolean {
    const numericPort = +port;

    if (isNaN(numericPort) || numericPort < 1) {
      return true;
    }

    return ZUrlBuilder.ProtocolPorts[protocol] === +port;
  }

  /**
   * The representation of the url object.
   */
  private readonly _url: {
    protocol: string;
    username: string;
    password: string;
    hostname: string;
    port: number;
    path: string[];
    hash: string;
    params: Array<{ key: string; val: string }>;
  };

  /**
   * Initializes a new instance of this object.
   *
   * @param protocol The protocol to use.
   * @param hostname The hostname to connect with.
   */
  public constructor(protocol = 'http', hostname = 'localhost') {
    this._url = {
      protocol,
      hostname,
      username: null,
      password: null,
      port: null,
      path: ['/'],
      hash: '',
      params: []
    };
  }

  /**
   * Fills the information from the current location data.
   *
   * @param loc The optional location object to populate with.
   *
   * @returns This object.
   */
  public location(loc: Location = location): this {
    this.protocol(loc.protocol)
      .hostname(loc.hostname)
      .hash(loc.hash)
      .path(loc.pathname)
      .port(+loc.port);

    let search = loc.search;

    if (search.startsWith('?')) {
      search = search.slice(1);
      const pairs = search.split('&');
      pairs.map((pair) => pair.split('=')).forEach((matrix) => this.param(matrix[0], matrix[1]));
    }

    return this;
  }

  /**
   * Fills the information for an api path call.
   *
   * This is a combination of location, hash with an empty string, and an
   * append of the basePath.
   *
   * @param loc The optional location object to populate with.
   * @param basePath The basePath for the api.  Generally, it's best to just keep this as api and
   * have your server accept this path.
   *
   * @returns This object.
   */
  public api(loc: Location = location, basePath = 'api'): this {
    return this.location(loc).hash('').path(basePath);
  }

  /**
   * Parses an existing url and sets all properties.
   *
   * If you give this a path without the protocol and hostname, then it will
   * automatically append the protocol and host of the browser window if it
   * exists.
   *
   * This method sets all the properties so if you need to modify the url before
   * parsing it, it is best to always call this method first.
   *
   * @param url The url to parse.
   *
   * @returns This object.
   */
  public parse(url: string) {
    const current = new URLParse(url, true);

    this.protocol(current.protocol)
      .username(current.username)
      .password(current.password)
      .hostname(current.hostname)
      .hash(current.hash)
      .path(current.pathname)
      .port(current.port ? +current.port : null);

    Object.keys(current.query).forEach((key) => this.param(key, current.query[key]));

    return this;
  }

  /**
   * Sets the url for a user gravatar.
   *
   * @param hash The md5 email hash.
   * @param size The dimensional size of the gravatar image.
   *
   * @returns This object.
   */
  public gravatar(hash?: string, size?: number): this {
    let current = this.parse(ZUrlBuilder.UrlGravatar);
    current = hash ? current.append(hash) : current;
    current = size ? current.param('s', String(size)) : current;
    return current;
  }

  /**
   * Sets the url for a github source file.
   *
   * The actual destination you will arrive at depends on how specific you want to get.
   *
   * @param user The user that owns the project.  If this is falsy, then the root of github is set.
   * @param project The project to link to.  If this is falsy, the the github api user's root page is returned.  This and everything below it is ignored
   *                if the user is not set.
   * @param commit The commit hash or branch.  If this is falsy, then it defaults to main (Github current standard as of 1-31-2021).  If the path is not set and this value is, then the
   *               url is set to the entire commit page.  If you intend to link a path or link to an entire commit branch, then it is always best to explicitly set this value instead
   *               of just leaving it at the default.  Github decided to change this due to the BLM movement, but there are still a lot of legacy source repositories that use master as
   *               the default branch.
   * @param path The file path to open. If this is falsy, then the project page is returned.  Note that you may set a directory here as Github will properly redirect the url from blob
   *             to tree.
   * @param line The optional line number to highlight.  If this is falsy, then nothing in the path is highlighted.  This is only used if the path is set.
   *
   * @returns This object.
   */
  public github(user?: string, project?: string, commit?: string, path?: string, line?: number): this {
    let current = this.parse(ZUrlBuilder.UrlGithub);

    if (user) {
      current = current.append(user);
      if (project) {
        current = current.append(project);
        if (path) {
          current = current
            .append('blob')
            .append(commit || 'main')
            .append(path);
          current = line != null ? current.hash(`L${line}`) : current;
        } else if (commit) {
          current = current.append('commit').append(commit);
        }
      }
    }

    return current;
  }

  /**
   * Sets the protocol.
   *
   * @param protocol The protocol.
   *
   * @returns This object.
   */
  public protocol(protocol: string): this {
    this._url.protocol = protocol;
    return this;
  }

  /**
   * Sets the user name.
   *
   * Used for things like ssh and ftp.
   *
   * @param user The username
   *
   * @returns This object.
   */
  public username(user: string): this {
    this._url.username = user;
    return this;
  }

  /**
   * Sets the password.
   *
   * This is only valid if the username is set.
   *
   * @param pwd The user password.
   *
   * @returns This object.
   */
  public password(pwd: string): this {
    this._url.password = pwd;
    return this;
  }

  /**
   * Sets the host name.
   *
   * This sets the entire hostname as the root domain.  This
   * will blow away any subdomains added, so it's best to
   * call this method first.
   *
   * @param host The hostname.
   *
   * @returns This object.
   */
  public hostname(host: string): this {
    this._url.hostname = host;
    return this;
  }

  /**
   * Adds a subdomain in front of the hostname.
   *
   * If a hostname was never set, then domain becomes the hostname.
   *
   * @param domain The domain to append.
   *
   * @returns This object.
   */
  public subdomain(domain: string): this {
    this._url.hostname = this._url.hostname ? `${domain}.${this._url.hostname}` : domain;
    return this;
  }

  /**
   * Sets the port.
   *
   * @param port The port.
   *
   * @returns This object.
   */
  public port(port: number): this {
    this._url.port = port;
    return this;
  }

  /**
   * Removes all existing path segments and restarts the path.
   *
   * @param path The starting path.
   *
   * @returns This object.
   */
  public path(path: string): this {
    this._url.path = [path];
    return this;
  }

  /**
   * Appends a path segment.
   *
   * @param path The segment to append.
   *
   * @returns This object.
   */
  public append(path: string): this {
    this._url.path.push(path);
    return this;
  }

  /**
   * Sets the hash section.
   *
   * @param hash The hash section.
   *
   * @returns This object.
   */
  public hash(hash: string): this {
    this._url.hash = hash;
    return this;
  }

  /**
   * Adds a search parameter.
   *
   * This version assumes that value is not null.
   *
   * @param key The parameter key.
   * @param val The parameter value.
   *
   * @returns This object.
   */
  public param(key: string, val: string): this {
    this._url.params.push({ key, val });
    return this;
  }

  /**
   * Builds the url string and returns it.
   *
   * @returns The url string.
   */
  public build(): string {
    const search = this._url.params.map((param) => `${param.key}=${encodeURIComponent(param.val)}`).join('&');
    const user = trim(this._url.username);
    const password = trim(this._url.password);
    let protocol = trim(this._url.protocol);
    let host = trim(this._url.hostname);
    let port = String(this._url.port);
    let hash = trim(this._url.hash);
    let path = this._url.path.map((segment) => trim(segment, '/')).join('/');
    let credentials = '';

    protocol = trimEnd(protocol, '/:');
    host = trim(host, '/');
    hash = trimStart(hash, '#');
    path = trim(path, '/');

    if (ZUrlBuilder.defaults(protocol, port)) {
      port = '';
    } else {
      port = `:${port}`;
    }

    if (user) {
      credentials = password ? `${user}:${password}@` : `${user}@`;
    }

    let url = `${protocol}://${credentials}${host}${port}`;

    if (path) {
      url = `${url}/${path}`;
    }

    if (search) {
      url = `${url}/?${search}`;
    }

    if (hash) {
      url = `${url}#${hash}`;
    }

    return url;
  }
}
