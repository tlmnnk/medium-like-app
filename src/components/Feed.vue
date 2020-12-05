<template>
  <div>
    <div v-if="error">
      <ErrorMessage />
    </div>
    <div v-else-if="feedData" class="feed__wrapper">
      <div class="feed-preview" v-for="(feedItem, index) in feedData.articles" :key="index">
        <div class="feed-item__feed-info">
          <div class="feed-item__userblock">
            <div class="feed-item__user-ava">
              <el-avatar :size="40" :src="feedItem.author.image" @error="avatarErrorHandler">
                <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"/>
              </el-avatar>
            </div>
            <div class="feed-item__userdata">
              <router-link :to="{name: 'User', params: {slug: feedItem.author.username}}">{{feedItem.author.username}}</router-link>
              <p class="feed-item__createdat">{{feedItem.createdAt.slice(0, 10)}}</p>
            </div>
          </div>
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
        <div class="feed-item__tags">TAGS</div>
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
import Pagination from '../components/Pagination'
import ErrorMessage from '../components/ErrorMessage'
import {LIMIT} from '../helpers/vars'

export default {
  name: 'Feed',
  components: {
    Pagination,
    ErrorMessage
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
    avatarErrorHandler() {
      return true
    }
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
.feed-item__userblock {
  width: 120px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.feed-item__userdata {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.feed-item__feed-info {
  display: flex;
  justify-content: space-between;
}
.feed-item__title {
  color: #000;
  text-decoration: none !important;
}
.feed-item__user-ava {
  margin-right: 10px;
}
.divider {
  height: 2px;
  background: #dbe7ff;
}
.feed-item__text {
  display: flex;
  flex-direction: column;
  align-items: baseline;
  margin-left: 50px;
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
.feed-item__createdat {
  font-size: 12px;
  color: #c7d9fc;
}
</style>