# Removing demo files

This project contains demo and examples files. These demo files are used to help create and test features of the template project along with concrete examples. Before starting a new project, you will want to remove the demo files. To do so, perform the following:

1. Remove npm packages used in the demo files. These are listed in the `src/demoFiles/PackagesUsedInDemo.md` file.
1. Delete the entire `src/demoFiles` directory.
1. In the `src/App.tsx` file delete the two areas referencing the demo files
1. (Optional) Remove all references to `USE_DEMO` constant.
