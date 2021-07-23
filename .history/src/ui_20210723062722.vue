<template lang="pug">
div.p-xsmall
  div(style="flex: 0 0 100%")
    Txt(size="small", weight="bold") Padding
    .flex
      .column
        Label Horizontal
        Input(v-model="paddingHor")
      .column
        Label Vertical
        Input(v-model="paddingVer")
    Label Border Radius
    Input(v-model="borderRadius")
  div(style="flex: 0 0 100%")
    Txt(size="small", weight="bold") Typography
    Label Font Family
    Select(:items="itemsFamily", v-model="fontFamily")
    Label Font Style
    Select(:items="itemsStyle", v-model="fontStyle")
    Label Font Size
    Input(v-model="fontSize")
  div(style="flex: 0 0 100%")
    Button(@click="createSystem") Create System
    Button(@click="pickColor") Pick Color
</template>

<script>
import { dispatch, handleEvent } from "./uiMessageHandler";
import { Button } from 'figma-plugin-ds-vue';
import { Label, Input } from 'figma-plugin-ds-vue'
import { Txt } from 'figma-plugin-ds-vue'
import { Checkbox } from 'figma-plugin-ds-vue';
import { Select } from 'figma-plugin-ds-vue';
import Pickr from '@simonwep/pickr';

export default {
  data() {
    return {
      paddingHor: 16,
      paddingVer: 8,
      fontFamily: "Helvetica Neue",
      fontStyle: "Regular",
      fontSize: 16,
      borderRadius: 4,
      itemsFamily: [],
      itemsStyle: [],
    };
  },
  components: {
    Button,
    Input,
    Txt,
    Label,
    Checkbox,
    Select
  },
  created() {

    dispatch("callFonts", {});
    handleEvent("getFonts", listFonts => {
      let listFamilies = [... new Set(listFonts.map(item => item.fontName.family))];
      let listFamiliesOpt = [];
      for (var i=1; i < listFamilies.length; i++) {
        listFamiliesOpt.push({key: listFamilies[i], label: listFamilies[i]})
      }
      this.itemsFamily = listFamiliesOpt;

      // Create filter by Family selected
      function filterFamily(value) {
        return value.fontName.family == this;
      }

      let listStyles = [... new Set(listFonts.filter(filterFamily, this.fontFamily).map(item => item.fontName.style))];
      console.log(listStyles);
      let listStylesOpt = [];
      for (var i=0; i < listStyles.length; i++) {
        listStylesOpt.push({key: listStyles[i], label: listStyles[i]})
      }
      this.itemsStyle = listStylesOpt;

    })
  },
  watch: {
    'fontFamily': function() {
      dispatch("callFonts", {});
    }
  },
  methods: {
    createSystem() {
      dispatch("createSystem", {
        paddingHor: this.paddingHor,
        paddingVer: this.paddingVer,
        fontFamily: this.fontFamily,
        fontStyle: this.fontStyle,
        fontSize: this.fontSize,
        borderRadius: this.borderRadius
      })
    },
    pickColor() {
      console.log('seu gato');

      const pickr = Pickr.create({
        el: '.color-picker',
        theme: 'classic', // or 'monolith', or 'nano'

        swatches: [
            'rgba(244, 67, 54, 1)',
            'rgba(233, 30, 99, 0.95)',
            'rgba(156, 39, 176, 0.9)',
            'rgba(103, 58, 183, 0.85)',
            'rgba(63, 81, 181, 0.8)',
            'rgba(33, 150, 243, 0.75)',
            'rgba(3, 169, 244, 0.7)',
            'rgba(0, 188, 212, 0.7)',
            'rgba(0, 150, 136, 0.75)',
            'rgba(76, 175, 80, 0.8)',
            'rgba(139, 195, 74, 0.85)',
            'rgba(205, 220, 57, 0.9)',
            'rgba(255, 235, 59, 0.95)',
            'rgba(255, 193, 7, 1)'
        ],

        components: {

            // Main components
            preview: true,
            opacity: true,
            hue: true,

            // Input / output Options
            interaction: {
                hex: true,
                rgba: true,
                hsla: true,
                hsva: true,
                cmyk: true,
                input: true,
                clear: true,
                save: true
            }
        }
      });

      pickr.on('init', instance => {

    // Grab actual input-element
    const {result} = instance.getRoot().interaction;

    // Listen to any key-events
    result.addEventListener('keydown', e => {

        // Detect whever the user pressed "Enter" on their keyboard
        if (e.key === 'Enter') {
            instance.applyColor(); // Save the currently selected color
            instance.hide(); // Hide modal
        }
    }, {capture: true});
});
    }
    // saveLink() {
    //   dispatch("storageLink", {
    //     linkSaving: this.linkPasted.split('?')[0]
    //   });
    //   dispatch("notify", {
    //     message: "🥰 This link is saved for next uses",
    //     time: 2000
    //   })
    // },
    // resetLink() {
    //   dispatch("resetLink", {});
    //   dispatch("notify", {
    //     message: "🙄 You reset the link...",
    //     time: 2000
    //   })
    // },
    // copyLink() {
    //   if (this.linkColor) {
    //     this.$copyText(this.linkNode).then(function (e) {
    //       dispatch("notify", {
    //         message: "📋 Copied to your clipboard!",
    //         time: 1000
    //       })
    //     })
    //   } else {
    //     dispatch("notify", {
    //       message: "😬 Select a frame!",
    //       time: 4000
    //     })
    //   }
      
    // }
  }
};
</script>

<style lang='scss'>
// @import "./figma-ui/figma-plugin-ds";
// @import "../node_modules/figma-plugin-ds/dist/figma-plugin-ds.css"
@import '../node_modules/figma-plugin-ds-vue/dist/figma-plugin-ds-vue.css';
@import '../node_modules/@simonwep/pickr/dist/themes/monolith.min.css'


</style>