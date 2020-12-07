<template>
  <div>
    <div v-if="error">
      <ErrorMessage />
    </div>
    <div v-else-if="feedData" class="feed__wrapper">
      <div class="feed-preview" v-for="(feedItem, index) in feedData.articles" :key="index">
        <div class="feed-item__feed-info">
         <UserInfoBlock :feedItem="feedItem"/>
          <div class="feed-item__feed-likes">
            <el-badge :value="feedItem.favoritesCount" class="item">
              <el-button size="small"><i class="el-icon-star-off"></i></el-button>
            </el-badge>
          </div>
        </div>
        <div class="feed-item__text">
          <router-link class="feed-item__title" :to="{name: 'article', params: {slug: feedItem.slug}}">
            <h2 class="feed-item__title">{{feedItem.title}}</h2>
          </router-link>
          <p>{{feedItem.description}}</p>
        </div>
        <div class="feed-item__readmore">
          <router-link class="feed-item__readmore-link" :to="{name: 'article', params: {slug: feedItem.slug}}">
            <p>read more...</p>
          </router-link>
        </div>
        <div class="feed-item__tags">
          <ArticleTags v-if="feedItem.tagList.length" :tags="feedItem.tagList"/>
        </div>
        <div class="divider"></div>
      </div>
      <Pagination
      :total="feedData.articlesCount" 
      :pageSize="articlesPerPage"
      :currentPage="currentPage"
      :url="baseUrl"/>
    </div>
    <div v-else-if="isLoading" class="feed__loading"></div>
    
  </div>
</template>

<script>
import { Loading } from 'element-ui';
import {mapActions, mapGetters} from 'vuex'
import {LIMIT} from '../helpers/vars'
import Pagination from '../components/Pagination'
import ErrorMessage from '../components/ErrorMessage'
import UserInfoBlock from '../components/UserInfoBlock'
import ArticleTags from '../components/ArticleTags'


export default {
  name: 'Feed',
  components: {
    Pagination,
    ErrorMessage,
    UserInfoBlock,
    ArticleTags
  },
  props: {
    apiUrl: {
      type: String,
      required: true
    }
  },
  data: ()=>({
    url: '/tags/dragons',
    loadingInstance: null
  }),
  updated() {
    if (this.isLoading) {
      this.loadingInstance = Loading.service({
        target: '.feed',
        fullscreen: 'false'
        });
    } else {
      this.loadingInstance && this.loadingInstance.close()
    }
  },
  computed: {
    ...mapGetters('feed', ['feedData', 'isLoading', 'error']),
    articlesPerPage() {
      return LIMIT
    },
    currentPage() {
      return Number(this.$route.query.page || '1')
    },
    baseUrl() {
      return this.$route.path
    },
    offset() {
      return ((this.currentPage*LIMIT)-LIMIT)
    }
  },
  watch: {
    currentPage() {
      this.fetchFeed({
        apiUrl: this.apiUrl,
        limit: LIMIT, 
        offset: this.offset
      })
    }
  },
  methods: {
    ...mapActions('feed', ['fetchFeed']),
  },
  mounted() {
     this.fetchFeed({
      apiUrl: this.apiUrl, 
      limit: LIMIT, 
      offset: this.offset
  })
  }
}
</script>

<style>
.feed__wrapper {
  min-height: 100Vh;
}
.feed-preview {
  margin-top: 20px;
}
.feed-item__feed-info {
  display: flex;
  justify-content: space-between;
}
.feed-item__title {
  color: #000;
  text-decoration: none !important;
}
.divider {
  height: 2px;
  background: #dbe7ff;
}
.feed-item__text {
  margin-left: 50px;
  display: flex;
  flex-direction: column;
  align-items: baseline;
  overflow: hidden;
}
.feed-item__feed-likes {
  margin-top: 10px;
  margin-right: 10px;
}
.feed-item__readmore-link {
  text-decoration: none;
  font-size: 14px;
  color: #c7d9fc;
}
</style>