import * as vscode from 'vscode';


export function activate(context: vscode.ExtensionContext) {

	let disposable = vscode.commands.registerCommand('llvm-ir-language-support.helloWorld', () => {
		vscode.window.showInformationMessage('Hello World from LLVM IR Language Support!');
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
