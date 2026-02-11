import axios from 'axios';

interface SignupResponse {
  isSuccess: boolean;
  code?: string;
  message?: string;
  result?: any;
}

interface SignupPayload {
  loginId: string;
  password: string;
  email: string;
  name: string;
  birthDate: string;
  isTermsAgreedRequired: boolean;
  isTermsAgreedOptional: boolean;
}

export const authService = {
  async signup(data: SignupPayload): Promise<SignupResponse> {
    try {
      const response = await axios.post('/api/v1/auth/signup', data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Signup error:', error.response?.data || error.message);
        return {
          isSuccess: false,
          message: error.response?.data?.message || '회원가입 중 오류가 발생했습니다.',
        };
      }
      throw error;
    }
  },
};
