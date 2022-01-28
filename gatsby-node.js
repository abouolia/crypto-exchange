exports.createPages = async ({ actions }) => {
  const { createPage } = actions
  createPage({
    path: "/exchange/:id",
    matchPath: "/exchange/:id",
    component: require.resolve("./src/templates/singleExchange.tsx"),
    // context: {},
    // defer: true,
  })
}
