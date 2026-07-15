import { getCollection } from "astro:content";
import { SITE, SOCIAL } from "../config";

export async function GET() {
  const projects = (await getCollection("projects")).sort((a, b) => a.data.order - b.data.order);
  const writing = (await getCollection("writing", ({ data }) => !data.draft)).sort(
    (a, b) => b.data.publishedDate.valueOf() - a.data.publishedDate.valueOf(),
  );

  const projectLinks = projects.map(
    (project) => `- [${project.data.title}](${SITE.url}/projects/${project.id}/): ${project.data.description}`,
  );
  const writingLinks = writing.length
    ? writing.map((post) => `- [${post.data.title}](${SITE.url}/writing/${post.id}/): ${post.data.description}`)
    : [`- [Writing](${SITE.url}/writing/): Upcoming articles about network behavior, diagnostics, and technical tools.`];

  const content = [
    `# ${SITE.name}`,
    "",
    `> ${SITE.description}`,
    "",
    `${SITE.name} is a network engineer and technical educator who publishes practical explanations, open-source tools, and project notes about modern networks.`,
    "",
    "## Primary pages",
    `- [Home](${SITE.url}/): Professional identity, current writing, selected projects, and ways to connect.`,
    `- [About](${SITE.url}/about/): Professional background, working approach, credentials, and education.`,
    `- [Projects](${SITE.url}/projects/): Network learning experiences and open-source tools.`,
    `- [Writing](${SITE.url}/writing/): Technical articles about network behavior, observability, troubleshooting, and automation.`,
    "",
    "## Projects",
    ...projectLinks,
    "",
    "## Writing",
    ...writingLinks,
    "",
    "## Elsewhere",
    `- [GitHub](${SOCIAL.github}): Source code and repositories.`,
    `- [LinkedIn](${SOCIAL.linkedin}): Short-form technical posts and professional updates.`,
    `- [RSS feed](${SITE.url}${SOCIAL.rss}): Published articles in RSS format.`,
  ].join("\n");

  return new Response(`${content}\n`, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
