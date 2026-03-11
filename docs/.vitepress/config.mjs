export default {
  title: "Template Docs Platform",
  description: "Documentation and preview of templates",
  base: "/template-docs-platform/",

  themeConfig: {
    nav: [
      { text: "Home", link: "/" },
      { text: "Templates", link: "/templates" },
      { text: "Agencies", link: "/agencias" },
      { text: "Flows", link: "/flujos" },
      { text: "Channels", link: "/canales" }
    ],

    sidebar: [
      {
        text: "Documentation",
        items: [
          { text: "Home", link: "/" },
          { text: "Templates", link: "/templates" },
          { text: "Agencies", link: "/agencias" },
          { text: "Flows", link: "/flujos" },
          { text: "Channels", link: "/canales" }
        ]
      }
    ]
  }
}