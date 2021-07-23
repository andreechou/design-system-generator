import { dispatch, handleEvent } from './codeMessageHandler';
figma.showUI(__html__);
figma.ui.resize(500,800);


handleEvent('callFonts', () =>  {
	async function getFonts() {
		const result = await figma.listAvailableFontsAsync();
		// console.log(result);
		dispatch('getFonts', result);
		return result;
	}
	getFonts();
})

handleEvent('createSystem', (state) => {
	async function main() {
		await figma.loadFontAsync({ family: "Roboto", style: "Regular" });
		await figma.loadFontAsync({ family: state.fontFamily, style: state.fontStyle });

		const text = figma.createText();
		text.characters = "Button";
		text.fills = [{ type: 'SOLID', color: {r: 1, g: 1, b: 1} }];
		text.fontName = { family: state.fontFamily, style: state.fontStyle};

		const frame = figma.createComponent();
		frame.insertChild(0, text);
		frame.fills = [{ type: 'SOLID', color: {r: 1, g: 0, b: 0} }];
		frame.layoutMode = "HORIZONTAL";
		frame.primaryAxisSizingMode = "AUTO";
		frame.counterAxisSizingMode = "AUTO";
		frame.paddingLeft = 16;
		frame.paddingRight = 16;
		frame.paddingTop = 8;
		frame.paddingBottom = 8;
		frame.cornerRadius = Number(state.radius);

		figma.notify("😘 System created!")
	}
})

handleEvent('notify', (state) => {
	if(state.time) {
		figma.notify(state.message, {timeout: state.time} )
	} else {
		figma.notify(state.message)
	}
	
})

// handleEvent('selectNode', () => {
// 	// console.log(state.fontFamily)
// 	figma.on('selectionchange', () => {
// 		if(figma.currentPage.selection.length > 0) {
// 			const selection = figma.currentPage.selection;
// 			if(selection[0].constructor.name == "FrameNode") {
// 				const result = selection[0].id.replace(":", "%3A");
// 				// console.log(selection[0].constructor.name);
// 				dispatch('returnId', result);
// 			} else {
// 				dispatch('returnId', false);
// 			}
// 		} else {
// 			dispatch('returnId', false);
// 		}
// 	})
// })

// handleEvent('storageLink', (state) =>  {
// 	async function setSync() {
// 		const result = await figma.clientStorage.setAsync("url", state.linkSaving);
// 		// console.log(result);

// 		async function getSync() {
// 			const resultSave = await figma.clientStorage.getAsync("url");
// 			console.log(resultSave);
// 			dispatch('getLinkReturn', resultSave);
// 		}
// 		getSync();
// 	}
// 	setSync();
// })

// handleEvent('resetLink', () => {
// 	async function resetSync() {
// 		const result = await figma.clientStorage.setAsync("url", undefined);
// 		console.log(result);
// 		dispatch('getLinkReturn', result);
// 	}
// 	resetSync();
// })

// handleEvent('getLink', () =>  {
// 	async function getSync() {
// 		const result = await figma.clientStorage.getAsync("url");
// 		console.log(result);
// 		dispatch('getLinkReturn', result);
// 	}
// 	getSync();
// })