<template>
  <component-auth-layout>
    <component-auth-card :title="title" :sub-title="subTitle">
      <component-form-login @submit="login" />
    </component-auth-card>
  </component-auth-layout>
</template>

<script>
import ComponentAuthLayout from '@/components/auth/AuthLayout';
import ComponentFormLogin from '@/components/auth/FormLogin';
import ComponentAuthCard from '@/components/auth/AuthCard';
export default {
  name: 'LoginPage',
  layout: 'anonymous',
  components: {
    ComponentAuthCard,
    ComponentFormLogin,
    ComponentAuthLayout
  },
  data () {
    return {
      title: 'Login',
      subTitle: 'Horse Tracking',
      valid: true,
      isPasswordVisible: false,
      user: {},
    }
  },
  methods: {
    async login ({ email, password }, clearForm) {
      try {
        await this.$store.dispatch('auth/login', { email, password });
      } catch (error) {
        throw error;
      }

      await this.$router.push('/')
    }
  }
}
</script>
