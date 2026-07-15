---
title: "Internet in Motion"
description: "An interactive visual guide to DNS, routing, packets, TCP, UDP, QUIC, and web performance for first-time learners."
status: "active"
featured: true
order: 1
tags: ["DNS", "Routing", "Transport", "Web Performance", "Interactive Learning"]
image: "/images/internet-in-motion.png"
imageAlt: "Internet in Motion request-and-response network learning experience"
repositoryUrl: "https://github.com/daniissac/internet-in-motion"
demoUrl: "https://daniissac.com/internet-in-motion/"
projectType: "webApplication"
---

## The learner problem

Networking fundamentals are often taught as isolated definitions. A learner may know what DNS, routing, TCP, or latency means without seeing how those ideas participate in one recognizable action.

Internet in Motion follows a website request from a device toward a server and back. Each explanation stays beside the behavior it describes so the learner can connect a concept with what it changes.

## What the experience includes

The journey contains eight connected chapters:

1. Networks and connections
2. The local network and gateway
3. Packets and recovery
4. IP addressing and DNS
5. Routing and alternate paths
6. TCP, UDP, and QUIC
7. Opening a website
8. Latency, bandwidth, and loss

The final Packet Playground recombines those ideas. Learners can change DNS caching, path availability, transport, latency, bandwidth, and packet loss, then inspect the resulting event log.

## Learning-design decisions

- Motion and explanation remain close together.
- Prediction checks provide immediate explanatory feedback.
- Every guided sequence can be paused, replayed, or stepped through manually.
- One journey thread connects the chapters without suggesting that one literal packet persists end to end.
- Simplifications are stated instead of presenting an illustrative route or timing result as universal.

## Technical boundaries

The values in the experience are teaching examples, not measurements. DNS answers can change, network paths may be asymmetric, and browsers may reuse cached answers, files, or established connections.

## Implementation

The project uses Next.js, React components, and CSS motion with no runtime data service. It exports to static files for GitHub Pages. Native controls, visible focus states, live status updates, reduced-motion support, and a page-wide motion pause are included in the interaction model.

## Current status

The first complete eight-chapter learning journey is live. The project remains active while wording, mobile layout, and learner feedback are refined.
