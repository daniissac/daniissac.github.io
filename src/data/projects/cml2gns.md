---
title: "cml2gns"
description: "A CML and VIRL to GNS3 topology converter with validation, node mapping, and command-line automation."
status: "experiment"
featured: true
order: 4
tags: ["Python", "Cisco CML", "GNS3", "Topology", "Network Labs"]
repositoryUrl: "https://github.com/daniissac/cml2gns"
projectType: "softwareSource"
---

## The problem

Network lab topologies are not portable simply because two platforms describe similar devices and links. Node types, interface naming, appliance templates, and configuration fields need explicit translation.

cml2gns explores a repeatable conversion path from Cisco CML or VIRL topology files into GNS3 project workflows.

## Current capabilities

- Parses CML and VIRL topology descriptions.
- Converts nodes and links into GNS3 project structures.
- Preserves available node configurations and connection data.
- Maps CML device types to GNS3 appliance templates.
- Supports custom mapping data for local lab environments.
- Provides command-line validation and logging.

## Why it remains an experiment

Topology conversion depends on the images and templates installed in a user's GNS3 environment. A generated project still needs local appliance mapping and validation before it can be treated as portable or complete.

## Direction

The useful long-term model is not a one-click promise. It is a transparent conversion report that shows which nodes mapped cleanly, which assumptions were made, and which devices need user input.
