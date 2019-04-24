<template>
  <el-form class="email-table" :model="form" label-position="left" label-width="100px">
    <el-form-item label="选择发件账户">
      <el-radio>阿里企业邮箱</el-radio>
      <!-- <el-radio v-model="form.account" label="2">QQ邮箱</el-radio> -->
    </el-form-item>
    <el-form-item label="邮箱账号">
      <el-input v-model="form.account" type="email" placeholder="xxx@smartahc.com"></el-input>
    </el-form-item>
    <el-form-item label="邮箱密码">
      <el-input v-model="form.password" type="password" placeholder="账号对应登录密码"></el-input>
    </el-form-item>
    <el-form-item label="邮件主题">
      <el-input v-model="form.subject" placeholder="xx月工资单"></el-input>
    </el-form-item>
    <el-form-item label="备注">
      <el-input v-model="form.remark" placeholder="选填"></el-input>
    </el-form-item>
    <el-form-item label="上传excel">
      <el-upload
        class="upload-demo"
        action=""
        drag
        :auto-upload="false"
        :on-change="uploadChange"
        :limit="1"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          将文件拖到此处，或
          <em>点击上传</em>
        </div>
      </el-upload>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">提交</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import XLSX from 'xlsx'
export default {
  name: "HelloWorld",
  data() {
    return {
      form: {
        account:'',
        password:'',
        remark:''
      },
      file:null
    };
  },
  methods: {
    uploadChange({raw}){
      this.file = raw
    },
    submit(){
      const fileReader = new FileReader()
      const form = this.form
      fileReader.readAsBinaryString(this.file)
      fileReader.onloadend = res=>{
        const workbook = XLSX.read(res.target.result,{type:'binary'})
        const data = XLSX.utils.sheet_to_json(workbook.Sheets.Sheet1,{header:'A'})
        const headerData = data.splice(0,2)
        const [header,header1] = headerData
        const params = {
          ...form,
          header,
          header1,
          data
        }
        this.$http.post('http://localhost:3000/',params).then(res=>{
          console.log(res);
        })
        
        
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.email-table{
  /* width: 70%; */
  /* margin: 0 auto; */
}
</style>
