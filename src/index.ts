import chokidar from 'chokidar'

const dependentedModules: Array<string> = []

const getSubModules = (nodeModule: NodeModule) => {
  nodeModule.children.forEach((element) => {
    if (element.children && element.id.indexOf('node_modules') === -1 && element.id.indexOf('electron') === -1) {
      dependentedModules.push(element.filename)
      getSubModules(element)
    }
  })
};

(() => {
  const entryModule = module.parent
  const watcher = chokidar.watch(entryModule.filename)
  getSubModules(entryModule)

  watcher.add(dependentedModules)

  watcher
    .on('change', () => {
      console.log(process.argv[process.argv.length - 1])
    })

})()
