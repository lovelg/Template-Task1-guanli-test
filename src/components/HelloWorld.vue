<template>
  <div>
    <div class="li">
      <el-upload class="upload-demo"
                 ref='ji'
                 action='url'
                 :file-list="list_ji"
                 :on-change="handleChangeJi"
                 :http-request="handleJiUpload"
                 :on-success="handleSuccess"
                 :on-error="handleError"
                 :auto-upload="false">
        <el-button slot="trigger"
                   size="small"
                   type="primary">选取集装箱图片文件</el-button>
        <el-button style="margin-left: 10px;"
                   size="small"
                   type="success"
                   @click="submitUploadJi">上传集装箱图片</el-button>
        <div slot="tip"
             class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
      <span>集装箱号:{{jinum}}</span>
    </div>

    <div class="li">
      <el-upload class="upload-demo"
                 ref='feng'
                 action='url'
                 :file-list="list_feng"
                 :on-change="handleChangeFeng"
                 :on-success="handleSuccess"
                 :on-error="handleError"
                 :http-request="handleFengUpload"
                 :auto-upload="false">
        <el-button slot="trigger"
                   size="small"
                   type="primary">选取封识号图片文件</el-button>
        <el-button style="margin-left: 10px;"
                   size="small"
                   type="success"
                   @click="submitUploadFeng">上传封识号图片</el-button>
        <div slot="tip"
             class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
      <span>封识号:{{fengnum}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      jinum: '',
      fileji: '',
      list_ji: [],
      fengnum: '',
      filefeng: '',
      list_feng: []
    }
  },
  mounted () {
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
        'file': this.fileji
      }
      this.service.postJi(params)
        .then((res) => {
          console.log(res)
          if (res.code === '00000000') {
            this.jinum = res.data.containerNum
          }
        })
    },
    handleFengUpload () {
      const params = {
        'file': this.filefeng
      }
      this.service.postFeng(params)
        .then((res) => {
          if (res.code === '00000000') {
            this.fengnum = res.data.sealRecogNum
          }
        })
    },
    handleChangeJi (file, fileList) { // 每次只传一张图片
      let arr = []
      arr.push(fileList[fileList.length - 1])
      this.list_ji = arr
      this.fileji = file
    },
    handleChangeFeng (file, fileList) {
      let arr = []
      arr.push(fileList[fileList.length - 1])
      this.list_feng = arr
      this.filefeng = file
    },
    handleSuccess (response, file, fileList) {
      console.log(response)
      this.fengnum = response.data.sealRecogNum || this.fengnum
      this.jinum = response.data.containerNum || this.jinum
      this.$message({
        message: '上传成功',
        type: 'success'
      })
    },
    handleError () {
      this.$message.error('上传失败')
    }
  }
}
</script>

<style scoped>
.li {
  margin-top: 200px;
}
span {
  display: block;
  margin-left: -400px;
  margin-top: 20px;
}
</style>
