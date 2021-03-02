import {
  formatFiles,
  generateFiles,
  getProjects,
  names,
  Tree,
} from '@nrwl/devkit';
import * as path from 'path';
import { InterfaceSchema } from './schema';

export default async function (host: Tree, schema: InterfaceSchema) {
  // read project from workspace.json / angular.json
  const project = getProjects(host).get(schema.projectName);

  // generate interfaces into app/my-app-name/lib/src/interfaces
  const targetPath = path.join(project.sourceRoot, 'interfaces');

  // read templates from tools/generators/interface/templates
  const templatePath = 'tools/generators/interface/templates';

  // generate different name variations for substitutions
  const interfaceNames = names(schema.name);

  const substitutions = {
    // remove __tmpl__ from file endings
    tmpl: '',
    // make the different name variants available as substitutions
    ...interfaceNames,
  };

  // generate the files from the templatePath into the targetPath
  generateFiles(host, templatePath, targetPath, substitutions);

  // format all files which were created / updated in this schematic
  await formatFiles(host);
}
