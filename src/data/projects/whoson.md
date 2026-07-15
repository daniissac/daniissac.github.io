---
title: "whoson"
description: "An nmap-powered subnet audit CLI with host inventory, change detection, exports, and topology images."
status: "maintained"
featured: true
order: 3
tags: ["Python", "nmap", "Subnet Audit", "Inventory", "CLI"]
repositoryUrl: "https://github.com/daniissac/whoson"
demoUrl: "https://pypi.org/project/whoson/"
projectType: "softwareSource"
---

## The problem

A quick subnet scan can show what responds now, but operational questions usually continue: What changed since the baseline? Which expected hosts are missing? Can the result be exported for another workflow?

whoson wraps nmap discovery in a focused command-line workflow for repeatable subnet audits.

## What it does

- Scans one or more networks using ping, TCP connect, or SYN modes.
- Classifies discovered hosts using available operating-system and port evidence.
- Exports host data to JSON or CSV.
- Saves a baseline and reports added, removed, or changed hosts later.
- Supports watch mode for recurring scans.
- Compares results with a known-host inventory.
- Generates a simple topology image for reporting.

## Honest topology boundaries

A scan cannot infer switch-port connections, router adjacencies, or the real Layer 2 and Layer 3 topology. The generated image uses a star layout because that is the only relationship the scan can represent honestly without CDP, LLDP, or SNMP evidence.

## Requirements

nmap must be installed on the system. Elevated privileges provide additional MAC address, vendor, SYN scan, and operating-system information where the platform supports it.

## Distribution

whoson is available as a Python package and includes automated tests for its audit and export workflows.
