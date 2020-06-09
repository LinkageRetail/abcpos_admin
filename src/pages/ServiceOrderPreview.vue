<template>
    <q-page>
        <div class="line_height_30 border_bottom_primary padding_10">
            <img class="width_80 float_left" src="~assets/logo.png" />
            <span class="float_right font_oblique font_size_14">{{$t('label_preview_title')}}</span>
        </div>
        <div v-if="isPDF" class="theCanvas" >
            <canvas id="the-canvas"></canvas>
            <div class="btn iconfont icon-jiahao" @click="add"></div>
            <div class="btn iconfont icon-jianhao" style="margin-top:40px" @click="reduce"></div>
        </div>
        <div v-else class="height_80_p padding_10">
            <textarea style="border: none ;" wrap="off" class="text" v-model="text" id="test" name="test" readonly></textarea>
        </div>
        <div
            class="border_top_primary height_10_p position_absolute width_100_p min_height_60 bottom_0 left_0 vertical_evenly primary_color bg_white"
        >
          <div class="row height_100_p width_100_p vertical_center text_align_center">
<!--            <div class="col-3 relative-position" v-ripple><div  @click="searchReturnOrRefundItemsByInvoNo()" :class="enableRefundButton?'':'font_color_primary_disable'" class="iconfont icon-tuihuanhuo padding_top_5 padding_bottom_5" style="font-size: 2em"></div></div>-->
<!--            <div class="col-3 relative-position" v-ripple><div @click="showVoidDialog" class="iconfont icon-chedan1 padding_top_5 padding_bottom_5" :class="enableVoidButton?'':'font_color_primary_disable'" style="font-size: 2em" v-ripple></div></div>-->
            <div @click="serviceOrderPrint" class="col-3 iconfont icon-iconfont-zhutizuizhong- relative-position" style="font-size: 2.5em" v-ripple></div>
            <div @click="goBack" class="col-3 iconfont icon-huitui relative-position" style="font-size: 2.5em" v-ripple></div>
          </div>
        </div>
    </q-page>
</template>

<script>
import PDFJS from 'pdfjs-dist'
import SysUtil from "../utils/SysUtil";

export default {
    data () {
        return {
          serviceOrderId:'',
          preView:{},
            enableVoidButton:false,
            enableRefundButton:false,
            pdfUrl:'filestatics/test.pdf',
            pdfUrl2:'http://file.dakawengu.com/file/2018-05-29/20180527-tianfeng.pdf',
            text:'',
            pages:[],
            pdfDoc:null,
            scale:0,
            initScale:0,
            isPDF:false
        }
    },
    computed:{

    },
    methods: {
        renderPage (num) {
            this.pdfDoc.getPage(num).then((page) => {
                let canvas = document.getElementById('the-canvas')
                let ctx = canvas.getContext('2d')
                let dpr = window.devicePixelRatio || 1
                let bsr = ctx.webkitBackingStorePixelRatio ||
                    ctx.mozBackingStorePixelRatio ||
                    ctx.msBackingStorePixelRatio ||
                    ctx.oBackingStorePixelRatio ||
                    ctx.backingStorePixelRatio || 1
                let ratio = dpr / bsr
                if(this.scale === 0) {
                    this.scale = screen.availWidth / page.getViewport(1).width
                    this.initScale = screen.availWidth / page.getViewport(1).width
                }
                let viewport = page.getViewport(this.scale)
                canvas.width = viewport.width * ratio
                canvas.height = viewport.height * ratio
                canvas.style.width = viewport.width + 'px'
                canvas.style.height = viewport.height + 'px'
                ctx.setTransform(ratio, 0, 0, ratio, 0, 0)
                let renderContext = {
                    canvasContext: ctx,
                    viewport: viewport
                }
                page.render(renderContext)
                // if (this.pages > num) {
                //     this.renderPage(num + 1)
                // }
            })
        },
        loadFile (url) {
            PDFJS.getDocument(url).then((pdf) => {
            this.pdfDoc = pdf
            // this.pages = this.pdfDoc.numPages
            this.$nextTick(() => {
                this.renderPage(1)
            })
            })
        },
        add(){
            this.scale += 0.1;
            this.renderPage(1);
        },
        reduce(){
            //if(this.scale === this.initScale){
            //    return;
            //}
            this.scale -= 0.1;
            this.renderPage(1);
        },
        serviceOrderPrint() {
          if (SysUtil.isNull(this.serviceOrderId)) {
            SysUtil.showError("ERROR", "serviceOrderPrint", "Service No cannot be empty!");
            return;
          }
          this.$axios.get("/payment/printServiceOrderReceipt", {
            params: {
              serviceOrderId: this.serviceOrderId,
            }
          })
            .then(res => {
              if (res.status == 200 && res.data != null) {
                if (res.data.code == 1) {
                  console.log("print successed");
                  SysUtil.showDialog("SUCCESS","Print successed and the print data has been sent!",()=>{},()=>{});
                } else {
                  SysUtil.showError("ERROR", "printServiceOrderReceipt", res.data.msg);
                }
              }
            }).catch(error => {
            SysUtil.showError("ERROR", "printServiceOrderReceipt", error.msg);
          });
        },
        goBack(){
            this.$router.back();
        }
    },
    mounted () {
      this.serviceOrderId = this.$route.params.serviceOrderId;
      this.preView = this.$route.params.preView;
      if(this.preView.printType=="PDF"){
        this.loadFile(process.env.API + "/print/" + this.preView.url);
        this.isPDF = true
      }else{
        this.text = this.preView.PrintBytes;
        this.isPDF = false
      }
    }
}
</script>

<style scoped>
.theCanvas {
    width: 100%;
    height: 80vh;
    overflow: auto;
}
.text {
    width:100%;
    height: 100%;
    outline:none;
    font-family:"Courier New";
    font-size:14px;
}
.btn {
    position: absolute;
    top: 50%;
    right: 20px;
    font-size: 30px;
}
</style>
