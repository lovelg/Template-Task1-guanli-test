<template>
  <div>
    <div class="li">
      <el-upload class="upload-demo"
                 ref='ji'
                 action='url'
                 :file-list="list_ji"
                 :on-change="handleChangeJi"
                 :http-request="handleJiUpload"
                 :auto-upload="false">
        <el-button slot="trigger"
                   size="small"
                   type="primary">选取集装箱图片文件</el-button>
        <el-button style="margin-left: 10px;"
                   size="small"
                   type="success"
                   @click="submitUploadJi">上传集装箱图片</el-button>
      </el-upload>
      <el-image style="width: 600px; height: 400px"
                :src="jiimg"
                :preview-src-list="srcListJi">
      </el-image>
      <span>集装箱号:{{jinum}}</span>
    </div>

    <div class="li">
      <el-upload class="upload-demo"
                 ref='feng'
                 action='url'
                 :file-list="list_feng"
                 :on-change="handleChangeFeng"
                 :http-request="handleFengUpload"
                 :auto-upload="false">
        <el-button slot="trigger"
                   size="small"
                   type="primary">选取封识号图片文件</el-button>
        <el-button style="margin-left: 10px;"
                   size="small"
                   type="success"
                   @click="submitUploadFeng">上传封识号图片</el-button>
      </el-upload>
      <el-image style="width: 600px; height: 400px"
                :src="fengimg"
                :preview-src-list="srcListFeng">
      </el-image>
      <span>封识号:{{fengnum}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      urlji: '',
      jiimg: '',
      srcListJi: [],
      urlfeng: '',
      fengimg: '',
      srcListFeng: [],
      jinum: '',
      list_ji: [],
      fengnum: '',
      list_feng: []
    }
  },
  methods: {
    submitUploadJi () {
      this.$refs.ji.submit()
    },
    submitUploadFeng () {
      this.$refs.feng.submit()
    },
    handleJiUpload () {
      const params = {
        'img': this.urlji
      }
      this.service.postJi(params)
        .then((res) => {
          console.log(res)
          if (res.code === '00000000') {
            this.$message({
              message: '上传成功',
              type: 'success'
            })
            this.jinum = res.data.containerNum || '无'
          } else {
            this.$message.error('上传失败')
          }
        })
    },
    handleFengUpload () {
      const params = {
        'img': this.urlfeng
      }
      this.service.postFeng(params)
        .then((res) => {
          console.log(res)
          if (res.success) {
            this.$message({
              message: '上传成功',
              type: 'success'
            })
            this.fengnum = res.data.toString() || '无'
          } else {
            this.$message.error('上传失败')
          }
        })
    },
    handleChangeJi (file, fileList) { // 每次只传一张图片
      let arr = []
      arr.push(fileList[fileList.length - 1])
      this.list_ji = arr
      let reader = new FileReader()
      reader.readAsDataURL(file.raw)
      let that = this
      reader.onload = function (e) {
        that.jiimg = e.target.result
        that.srcListJi.push(that.jiimg)
        that.urlji = e.target.result.split('base64,')[1]
      }
    },
    handleChangeFeng (file, fileList) {
      let arr = []
      arr.push(fileList[fileList.length - 1])
      this.list_feng = arr
      let reader = new FileReader()
      reader.readAsDataURL(file.raw)
      let that = this
      reader.onload = function (e) {
        that.fengimg = e.target.result
        that.srcListFeng.push(that.fengimg)
        that.urlfeng = e.target.result.split('base64,')[1]
      }
    }
  }
}
</script>

<style scoped>
.li {
  margin-top: 10px;
}
span {
  display: block;
  text-align: left;
  padding-left: 400px;
  margin-top: 20px;
}
</style>
