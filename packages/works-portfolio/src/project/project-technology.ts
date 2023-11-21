export enum ZProjectTechnology {
  Other = 'other',
  Node = 'node',
  Java = 'java',
  DotNet = 'dotnet'
}

export const ZTechnologyFontAwesomeIconMap: Record<ZProjectTechnology, [string, string?]> = {
  [ZProjectTechnology.Other]: ['question'],
  [ZProjectTechnology.Node]: ['node-js', 'brands'],
  [ZProjectTechnology.Java]: ['java', 'brands'],
  [ZProjectTechnology.DotNet]: ['microsoft', 'brands']
};

export const ZTechnologyDisplayMap: Record<ZProjectTechnology, string> = {
  [ZProjectTechnology.Other]: 'Other',
  [ZProjectTechnology.Node]: 'Node JS',
  [ZProjectTechnology.Java]: 'Java',
  [ZProjectTechnology.DotNet]: 'Microsoft .Net'
};
