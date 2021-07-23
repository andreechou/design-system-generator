import { dispatch, handleEvent } from './codeMessageHandler';
figma.showUI(__html__);
figma.ui.resize(200,800);


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

		const button = figma.createComponent();
		button.name = "Button";
		button.insertChild(0, text);
		button.fills = [{ type: 'SOLID', color: {r: 1, g: 0, b: 0} }];
		button.layoutMode = "HORIZONTAL";
		button.primaryAxisSizingMode = "AUTO";
		button.counterAxisSizingMode = "AUTO";
		button.paddingLeft = Number(state.paddingHor);
		button.paddingRight = Number(state.paddingHor);
		button.paddingTop = Number(state.paddingVer);
		button.paddingBottom = Number(state.paddingVer);
		button.cornerRadius = Number(state.borderRadius);
		
		// const iconShape = figma.createEllipse();
		// iconShape.fills = [{ type: 'SOLID', color: {r: 1, g: 1, b: 1} }];
		// iconShape.width = 12;
		// iconShape.height = 12;
		// iconShape.x = 2;
		// iconShape.y = 2;

		// const icon = figma.createComponent(); 
		// icon.name = "Icon"
		// icon.insertChild(0, iconShape);
		// icon.width = 16;
		// icon.height = 16;


		const text2 = figma.createText();
		text2.characters = "Button";
		text2.fills = [{ type: 'SOLID', color: {r: 1, g: 1, b: 1} }];
		text2.fontName = { family: state.fontFamily, style: state.fontStyle};

		const button2 = figma.createComponent();
		button2.name = "Button2";
		button2.insertChild(0, text2);
		button2.fills = [{ type: 'SOLID', color: {r: 1, g: 0, b: 0} }];
		button2.layoutMode = "HORIZONTAL";
		button2.primaryAxisSizingMode = "AUTO";
		button2.counterAxisSizingMode = "AUTO";
		button2.paddingLeft = Number(state.paddingHor);
		button2.paddingRight = Number(state.paddingHor);
		button2.paddingTop = Number(state.paddingVer);
		button2.paddingBottom = Number(state.paddingVer);
		button2.cornerRadius = Number(state.borderRadius);



		figma.notify("😘 System created!")
	}
	main();
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