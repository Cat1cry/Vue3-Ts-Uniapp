<script setup lang="ts">
import { ref } from 'vue';

import CustomNavbar from './components/CustomNavbar.vue';
import CategoryPanel from './components/CategoryPanel.vue';
import PageSkeleton from './components/PageSkeleton.vue';
import HotPanel from './components/HotPanel.vue';
import { onLoad } from '@dcloudio/uni-app';
import type { BannerItem, CategoryItem, HotItem } from '@/types/home';
import { getHomeBannerAPI, getHomeCategoryAPI, getHomeHotAPI } from '@/services/home';
import type { XtxGuessInstance } from '@/components/components';
import { useGuessList } from '@/composables';

const bannerList = ref<BannerItem[]>([]);
const getHomeBannerData = async () => {
  const res = await getHomeBannerAPI();
  bannerList.value = res.result;
};

// 获取前台分类数据
const categoryList = ref<CategoryItem[]>([]);
const getHomeCategoryData = async () => {
  const res = await getHomeCategoryAPI();
  categoryList.value = res.result;
};

// 获取热门推荐函数
const hotList = ref<HotItem[]>([]);
const getHomeHotData = async () => {
  const res = await getHomeHotAPI();
  hotList.value = res.result;
};

onLoad(async () => {
  isLoading.value = true;
  await Promise.all([getHomeBannerData(), getHomeCategoryData(), getHomeHotData()]);
  isLoading.value = false;
});

const { guessRef, onScrolltolower } = useGuessList();

const isLoading = ref(false);

// 下拉刷新
const isTriggered = ref(false);
const onRefresherrefresh = async () => {
  // 开始动画
  isTriggered.value = true;
  // 重置猜你喜欢组件数据
  guessRef.value?.resetData();
  // 加载数据
  await Promise.all([
    getHomeBannerData(),
    getHomeCategoryData(),
    getHomeHotData(),
    guessRef.value?.getMore,
  ]);
  // 结束动画
  isTriggered.value = false;
};
</script>

<template>
  <!-- 自定义导航栏 -->
  <CustomNavbar />
  <!-- 滚动容器 -->
  <scroll-view
    refresher-enabled
    :refresher-triggered="isTriggered"
    @refresherrefresh="onRefresherrefresh"
    @scrolltolower="onScrolltolower"
    class="scroll-view"
    scroll-y
  >
    <PageSkeleton v-if="isLoading" />
    <template v-else>
      <!-- 轮播图 -->
      <XtxSwiper :list="bannerList" />
      <!-- 分类面板 -->
      <CategoryPanel :list="categoryList" />
      <!-- 热门推荐 -->
      <HotPanel :list="hotList" />
      <!-- 猜你喜欢 -->
      <XtxGuess ref="guessRef" />
    </template>
  </scroll-view>
</template>

<style lang="scss">
page {
  background-color: #f7f7f7;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.scroll-view {
  flex: 1;
}
</style>
