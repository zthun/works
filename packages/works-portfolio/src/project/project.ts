import { ZProjectKind } from './project-kind';
import { ZProjectTechnology } from './project-technology';

export interface IZProject {
  _id: string;
  name: string;
  description: string;
  kind: ZProjectKind;
  technology: ZProjectTechnology;
  icon?: string;
  url?: string;
  source?: string;
}

export class ZProjectBuilder {
  private _project: IZProject;

  public constructor() {
    this._project = {
      _id: '',
      name: '',
      description: '',
      kind: ZProjectKind.Other,
      technology: ZProjectTechnology.Other
    };
  }

  public id(id: string): this {
    this._project._id = id;
    return this;
  }

  public name(name: string): this {
    this._project.name = name;
    return this;
  }

  public description(description: string): this {
    this._project.description = description;
    return this;
  }

  public kind(kind: ZProjectKind): this {
    this._project.kind = kind;
    return this;
  }

  public library = this.kind.bind(this, ZProjectKind.Library);
  public desktop = this.kind.bind(this, ZProjectKind.Desktop);
  public web = this.kind.bind(this, ZProjectKind.Web);
  public console = this.kind.bind(this, ZProjectKind.Console);

  public technology(technology: ZProjectTechnology): this {
    this._project.technology = technology;
    return this;
  }

  public java = this.technology.bind(this, ZProjectTechnology.Java);
  public node = this.technology.bind(this, ZProjectTechnology.Node);
  public dotnet = this.technology.bind(this, ZProjectTechnology.DotNet);

  public icon(icon: string): this {
    this._project.icon = icon;
    return this;
  }

  public url(url: string): this {
    this._project.url = url;
    return this;
  }

  public source(source: string): this {
    this._project.source = source;
    return this;
  }

  public assign(other: Partial<IZProject>) {
    this._project = { ...this._project, ...other };
    return this;
  }

  public copy(other: IZProject) {
    this._project = structuredClone(other);
    return this;
  }

  public build(): IZProject {
    return this._project;
  }
}
