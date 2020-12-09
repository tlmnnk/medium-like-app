<template>
  <div class="article__form">
    <el-form :model="articleData" status-icon :rules="articleRules" ref="articleDataForm" label-width="120px">
      <el-form-item label="title" prop="title">
        <el-input type="text" v-model="articleData.title" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="description" prop="description">
        <el-input type="text" v-model="articleData.description" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="body" prop="body">
        <el-input
          type="textarea"
          :rows="2"
          placeholder="Please input"
          v-model="articleData.body">
        </el-input>
      </el-form-item>
      <el-form-item label="tags" prop="tagList">
        <el-input type="text" v-model="articleData.tagList" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :disabled="isSubmitting" @click="submitForm('articleDataForm')">Publish article</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'ArticleForm',
  props: {
    initValues: {
      type: Object,
      required: true
    },
    isSubmitting: {
      type: Boolean,
      required: true
    }
  },
  data() {
    const tagListSerialize = (tagsArray) => tagsArray.join(' ')
    return {
      articleData :{
        title: this.initValues.title,
        description: this.initValues.description,
        body: this.initValues.body,
        tagList: tagListSerialize(this.initValues.tagList)
      },
      articleRules: {
        title: [
          { required: true, message: 'Please input title', trigger: 'blur' },
          { min: 3, max: 50, message: 'Length should be 3 to 50', trigger: 'blur' }
        ],
        description: [
           { required: true, message: 'Please input description', trigger: 'blur' },
          { min: 3, max: 50, message: 'Length should be 3 to 200', trigger: 'blur' }
        ],
        body: [
          { required: true, message: 'Please input body', trigger: 'blur' },
          { min: 30, message: 'Min length is 30 symbols', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
          if (valid) {
            const form = {
              title: this.articleData.title.trim(),
              description: this.articleData.description.trim(),
              body: this.articleData.body.trim(),
              tagList: this.articleData.tagList.trim() ? this.articleData.tagList.trim().split(' ') : []
            }
            this.$emit('submitArticle', form)
          } else {
            return false;
          }
        });
      
    }
  }
}
</script>

<style>
.article__form {
  margin-top: 40px;
}
</style>