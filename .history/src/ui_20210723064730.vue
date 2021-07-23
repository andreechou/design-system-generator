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
    .pickr
    .color-picker
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

    });

    const pickr = new Pickr({
      el: '.color-picker',
      theme: "monolith",
      swatches: null,
      defaultRepresentation: "HEXA",
      default: "#000000",
      comparison: false,
      components: {
        preview: true,
        opacity: true,
        hue: true,
        interaction: {
          hex: true,
          rgba: true,
          hsva: false,
          input: true,
          clear: true,
          cancel: true,
          save: true
        }
      }
    });
    pickr.on('init', instance => {
    console.log('Event: "init"', instance);
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