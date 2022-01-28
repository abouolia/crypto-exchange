exports.createPages = async ({ actions }) => {
  const { createPage } = actions
  createPage({
    path: "/exchange/:id",
    matchPath: "/exchange/:id",
    component: require.resolve("./src/templates/single-exchange.tsx"),
    // context: {},
    // defer: true,
  })
}
