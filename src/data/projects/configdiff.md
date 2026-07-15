---
title: "ConfigDiff"
description: "A semantic configuration comparison CLI that separates structural changes from formatting noise."
status: "maintained"
featured: true
order: 2
tags: ["Python", "Config Drift", "JSON", "YAML", "CI/CD"]
repositoryUrl: "https://github.com/daniissac/configdiff"
demoUrl: "https://pypi.org/project/configdiff/"
projectType: "softwareSource"
---

## The problem

Line-oriented diff tools treat indentation, ordering, and formatting as changes even when the underlying configuration is equivalent. That noise makes it harder to notice the values that actually changed during a review or deployment window.

ConfigDiff parses supported configuration files into normalized structures before comparing them recursively.

## What it does

- Compares JSON, YAML, TOML, and INI files.
- Classifies values as added, removed, modified, or type-changed.
- Reports precise dot-notation paths for nested changes.
- Supports ordered or order-insensitive list comparison.
- Produces human-readable terminal output or structured JSON and YAML.
- Uses exit codes designed for CI and deployment gates.

## Where it fits

The tool is useful when structured network, application, or deployment configuration needs to be reviewed for drift. Machine-readable output can feed review tooling and automation without scraping a textual patch.

## Boundaries

Both inputs must use the same supported structured format. Raw device configuration syntax is not interpreted as a vendor-aware model unless it has first been represented in JSON, YAML, TOML, or INI.

## Distribution

ConfigDiff is available as a Python package and can also run in a container. The repository includes automated tests and CI-oriented examples.
