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
  div(style="flex: 0 0 100%")
    Txt(size="small", weight="bold") Typography
      Label Font Family
      Select(:items="options", v-model="fontFamily")



  //- div.step1(v-if="!linkDefined")
  //-   div(style="flex: 0 0 100%")
  //-     Input.mb-xxsmall(icon="hyperlink", placeholder="Paste the link from this file", v-model="linkPasted")
  //-   div(style="flex: 0 0 100%")
  //-     Button.mt-xxsmall(@click="saveLink", v-if="linkPasted") Save
  //-     Button.mt-xxsmall(v-if="!linkPasted", disabled) Save
  //- div.step2(v-if="linkDefined")
  //-   Txt(style="word-break: break-all;", color="red", v-if="!linkColor") {{linkNode}}
  //-   Txt(style="word-break: break-all;", color="blue", v-if="linkColor") {{linkNode}}
  //-   .flex.mt-xsmall
  //-     Button(v-if="!linkColor", disabled) Copy
  //-     Button(@click="copyLink", v-if="linkColor") Copy
  //-     Button.ml-xsmall(@click="resetLink", tertiary) Reset Link
  //-   Txt.mt-xxsmall(style="word-break: break-all;", color="black3") Link: {{linkPasted}}
</template>

<script>
import { dispatch, handleEvent } from "./uiMessageHandler";
import { Button } from 'figma-plugin-ds-vue';
import { Label, Input } from 'figma-plugin-ds-vue'
import { Txt } from 'figma-plugin-ds-vue'
import { Checkbox } from 'figma-plugin-ds-vue';
import { Select } from 'figma-plugin-ds-vue'

export default {
  data() {
    return {
      paddingHor: 16,
      paddingVer: 8,
      fontFamily: "Helvetica Neue",
      fontStyle: "Regular",
      options: []
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
  mounted() {
    dispatch("callFonts", {});
    handleEvent("getFonts", listFonts => {
      console.log(listFonts);
      let listFamilies = [... new Set(listFonts.map(item => {key: item.fontName.family, label: item.fontName.family} ))];
      console.log(listFamilies);
      // this.options = listFamilies;
    })


    // dispatch("getLink", {});
    // handleEvent("getLinkReturn", linkSaved => {
    //   if(linkSaved) {
    //     this.linkPasted = linkSaved;
    //     this.linkDefined = true;
    //   } else {
    //     this.linkDefined = false;
    //   }
    // });

    // dispatch("selectNode", {});
    // handleEvent("returnId", nodeId => {
    //   if(nodeId && this.linkPasted) {
    //     this.linkNode = this.linkPasted.split('?')[0] + "?node-id=" + nodeId;
    //     this.linkColor = true;
        
    //   } else {
    //     this.linkNode = "Please select a Frame";
    //     this.linkColor = false;
    //   }
    // });
  },
  methods: {
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
@import '../node_modules/figma-plugin-ds-vue/dist/figma-plugin-ds-vue.css'


</style>