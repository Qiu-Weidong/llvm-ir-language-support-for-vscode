# llvm-ir-language-support
This plugin provides functions such as syntax highlighting, code formatting, and hover prompts for the `llvm ir` language.

## features
  - [x] syntax highlighting
  - [x] Code formatting
  - [x] Hover tooltip
  - [x] Error diagnosis
  - [x] jump definition
  - [x] View references
  - [ ] Autocompletion

## Code formatting
![](asset/format.gif)
## Hover prompt
When the mouse rolls over an `instruction`, its documentation will be displayed.

![](asset/hover2.gif)

When the mouse hovers over the variable, the type will be prompted, and when the mouse hovers over `comdat`, `attrgroup` and `type`, their definitions will be displayed.
![](asset/hover3.gif)

## Error Diagnosis
![](asset/diagnosed.gif)

## Go to Definition
![](asset/gotodefinition.gif)
![](asset/definition2.gif)
## View References
![](asset/references.gif)
![](asset/reference2.gif)