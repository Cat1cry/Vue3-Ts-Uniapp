import type { ProfileDetail } from '@/types/member';
import { http } from '@/utils/http';

/**
 * 获取用户个人资料
 */
export const getMemberProfileAPI = () => {
  return http<ProfileDetail>({
    method: 'GET',
    url: '/member/profile',
  });
};
