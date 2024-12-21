# V7 Product Interview Task

Thank you for taking the time to do this task! This repo uses [NPM workspaces](https://docs.npmjs.com/cli/v11/using-npm/workspaces) to provide both Vue and React templates with:

- A very basic reproduction of the Go table view
- An empty page for the entity view.

Choose the template you're most comfortable with - we evaluate based on the quality of your implementation, not which framework you use.

> _Note: While you're free to use a different framework altogether, we recommend using one of the provided templates. We don't give marks for reimplementing the template in a different framework._

- The styling is intentionally simple, and should not be used as an indication of how
  we expect you to style your submission.
- Feel free to use any styling solution; Tailwind, SASS, vanilla CSS - or anything else that you feel will showcase your ability to create a delightful UI!
- Given the time constraints, we don't expect high test coverage, but small sample tests are appreciated.

## What we expect

- A dismissable command center that is triggered with CMD+K/CTRL+K
  - The commands should trigger UI updates
- Integration with Go through the [API](https://docs.go.v7labs.com/)
- HTML that follows web standards
- Well-styled UI components
- Attention to detail regarding user interaction and experience
- It should work :)
- Have fun :tada:

We expect you to take 2-4 hours completing this task. The potential scope is
extremely large, but you should focus on the features you feel would be the
most impactful. We value polished features over breadth of scope.

If you have any questions, then please email your contact within our talent team.

## Repository Structure

This repository uses NPM workspaces to provide both Vue and React starter templates. You can choose either template for your submission based on your preferences and experience.

### Understanding npm Workspaces

The project is structured as follows:

```
project-root/
-- package.json
-- packages/
---- vue/ # Vue starter template
---- react/ # React starter template
---- styles/ # Stylesheets used in both templates
---- api/ # Functions to fetch data from the backend, and API type definitions
```

Each template in the `packages` directory is a separate application with its own dependencies, but they share the root-level configuration. This setup allows you to:

- Install all dependencies for both templates with a single `npm install` at the root
- Run commands for specific workspaces using the `-w` or `--workspace` flag
- Choose which template to build upon without dealing with unused code

### Getting Started

See the readmes in the Vue and React packages for information on how to get started.

### Submission Guidelines

- Please push your submission to a new branch on this repo
- Use code comments to communicate any information you feel would be useful when reviewing
- Please inform your contact within our talent team when you have pushed your branch
