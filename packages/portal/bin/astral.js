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

program.command('dev')
  .action(async () => {
    const nextExecutablePath = await getPackageExecutablPath('next');
    const portalPackageDirectory = await getPackageDirectory('@astral-dx/portal');
    const targetDirectory = path.join(process.cwd(), '.portal');
    const commandParts = ['dev',  targetDirectory];
    const { plugin } = await getPortalConfig();

    const entries = [
      'pages',
      'public',
      '.eslintrc.json',
      'next-env.d.ts',
      'next.config.mjs',
      'tsconfig.json',
      'theme',
    ];

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
    }

    entries.forEach(
      (f) => fs.copySync(
        path.join(portalPackageDirectory, f),
        path.join(targetDirectory, f),
        { overwrite: true },
      )
    );

    fs.copySync(
      path.join(process.cwd(), 'portal.config.js'),
      path.join(targetDirectory, 'portal.config.js'),
      { overwrite: true },
    );

    return new Promise((res, rej) => {
      spawn(nextExecutablePath, commandParts, { env: process.env, stdio: "inherit" })
        .on("exit", (code) => {
          return code === 0 ? res() : process.exit(code ?? undefined);
        })
        .on("error", rej);
    });
  });

  program.parse();