#!/usr/bin/env node
import { program } from 'commander';
import { spawn } from 'cross-spawn';
import { packageDirectory } from 'pkg-dir';
import fs from 'fs-extra';
import path from 'path';
import resolveCwd from 'resolve-cwd';
import {resolve} from 'import-meta-resolve';

const getPackageDirectory = async (pkg) => {
  return await packageDirectory({ cwd: resolveCwd(pkg) });
};

const getPackageExecutablPath = async (pkg, executable = pkg) => {
  const packageDirectory = await getPackageDirectory(pkg);

  if (!packageDirectory) {
    throw new Error(`Could not find package.json for '${pkg}'`);
  }

  const { bin } = await fs.readJson(path.join(packageDirectory, "package.json"));
  const binPath = typeof bin === "object" ? bin[executable] : bin;

  if (!binPath) {
    throw new Error(`No bin '${executable}' in module '${pkg}'`);
  }

  return path.join(packageDirectory, binPath);
};

const getPortalConfig = async () => {
  try {
    const config = await import(path.join(process.cwd(), 'portal.config.js'));
    return config.default;
  } catch (e) {
    console.warn(e)
  }
  
  return {};
}

const movePortalFiles = async () => {
  const portalPackageDirectory = await getPackageDirectory('@astral-dx/portal');
  const targetDirectory = process.cwd();
  const { plugin } = await getPortalConfig();

  [
    'pages',
    'public',
    '.eslintrc.json',
    'next-env.d.ts',
    'next.config.mjs',
    'tsconfig.json',
    'theme',
  ].forEach(
    (f) => fs.copySync(
      path.join(portalPackageDirectory, f),
      path.join(targetDirectory, f),
      { overwrite: true },
    )
  );

  for (const p of Object.values(plugin)) {
    const { packageName, folders } = p;

    if (packageName === 'local') {
      continue;
    }

    const packageDir = path.dirname(await resolve(packageName, import.meta.url)).replace('file:', '');

    if (folders?.pages) {
      fs.copySync(
        path.join(packageDir, folders.pages),
        path.join(targetDirectory, 'pages'),
        { overwrite: true },
      );
    }
    
    if (folders?.components) {
      fs.copySync(
        path.join(packageDir, folders.components),
        path.join(targetDirectory, 'components'),
        { overwrite: true },
      );
    }
    
    if (folders?.services) {
      fs.copySync(
        path.join(packageDir, folders.services),
        path.join(targetDirectory, 'services'),
        { overwrite: true },
      );
    }
  }
}

const runNextCommand = (command) => new Promise(async (res, rej) => {
  const nextExecutablePath = await getPackageExecutablPath('next');
  
  spawn(nextExecutablePath, [command], { env: process.env, stdio: "inherit" })
    .on("exit", (code) => {
      return code === 0 ? res() : process.exit(code ?? undefined);
    })
    .on("error", rej);
});

program.command('dev')
  .action(async () => {
    await movePortalFiles();
    return runNextCommand('dev');
  });

program.command('build')
  .action(async () => {
    await movePortalFiles();
    return runNextCommand('build');
  });

program.command('start')
  .action(async () => {
    return runNextCommand('start');
  });

  program.parse();