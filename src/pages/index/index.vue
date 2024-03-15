<script setup lang="ts">
import { ref } from 'vue';

import CustomNavbar from './components/CustomNavbar.vue';
import CategoryPanel from './components/CategoryPanel.vue';
import { onLoad } from '@dcloudio/uni-app';
import type { BannerItem } from '@/types/home';
import { getHomeBannerAPI, getHomeCategoryAPI } from '@/services/home';

const bannerList = ref<BannerItem[]>([]);
const getHomeBannerData = async () => {
  const res = await getHomeBannerAPI();
  bannerList.value = res.result;
};

// 获取前台分类数据
const getHomeCategoryData = async () => {
  const res = await getHomeCategoryAPI();
  console.log(res);
};

onLoad(() => {
  getHomeBannerData();
  getHomeCategoryData();
});
</script>

<template>
  <!-- 自定义导航栏 -->
  <CustomNavbar />
  <!-- 轮播图 -->
  <XtxSwiper :list="bannerList" />
  <!-- 分类面板 -->
  <CategoryPanel />
</template>

<style lang="scss">
page {
  background-color: #f7f7f7;
}
</style>
