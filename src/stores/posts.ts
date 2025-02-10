import { defineStore } from 'pinia'
import axios from 'axios'

export const usePostStore = defineStore('posts', {
  state: () => ({
    posts: [],
    post: {},
    page: 1,
    hasMore: true,
    loading: false,
    accessToken: localStorage.getItem('token') || null,
  }),

  actions: {
    async fetchPosts() {
      if (this.loading || !this.hasMore) return

      this.loading = true
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/posts?page=${this.page}`,
          {
            headers: {
              Authorization: `Bearer ${this.accessToken}`,
              'Content-Type': 'application/json',
            },
          },
        )
        const newPosts = response.data.posts

        if (newPosts.length === 0) {
          this.hasMore = false
        } else {
          this.posts = [...this.posts, ...newPosts]
          this.page += 1
        }
      } catch (error) {
        console.error('Error fetching posts:', error)
      } finally {
        this.loading = false
      }
    },

    async fetchSinglePost(postId: string) {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/posts/${postId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        this.post = response.data
        return true
      } catch (error) {
        console.error('Error fetch post:', error)
        return false
      }
    },

    async createPost(content: string, image?: File) {
      try {
        const formData = new FormData()
        formData.append('content', content)
        if (image) {
          formData.append('image', image)
        }

        const response = await axios.post(`${import.meta.env.VITE_API_URL}/posts`, formData, {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
            'Content-Type': 'multipart/form-data',
          },
        })

        this.posts.unshift(response.data)
        return true
      } catch (error) {
        console.error('Error creating post:', error)
        return false
      }
    },

    async editPost(postId: string, content: string) {
      try {
        const response = await axios.put(
          `${import.meta.env.VITE_API_URL}/posts/${postId}`,
          { content },
          {
            headers: {
              Authorization: `Bearer ${this.accessToken}`,
            },
          },
        )

        const postIndex = this.posts.findIndex((post) => post._id === postId)
        if (postIndex !== -1) {
          this.posts[postIndex] = { ...this.posts[postIndex], content: response.data.content }
        }
        return true
      } catch (error) {
        console.error('Error editing post:', error)
        return false
      }
    },

    async deletePost(postId: string) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/posts/${postId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        this.posts = this.posts.filter((post) => post._id !== postId)
        return true
      } catch (error) {
        console.error('Error deleting post:', error)
        return false
      }
    },

    async likePost(postId: string) {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/posts/${postId}/like`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          },
        )

        const postIndex = this.posts.findIndex((post) => post._id === postId)
        if (postIndex !== -1) {
          this.posts[postIndex].likes = response.data.likes
        }
      } catch (error) {
        console.error('Error liking post:', error)
      }
    },

    async addComment(postId: string, content: string) {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/posts/${postId}/comments`,
          {
            content,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          },
        )

        const postIndex = this.posts.findIndex((post) => post._id === postId)
        if (postIndex !== -1) {
          this.posts[postIndex].comments = response.data.comments
        }
      } catch (error) {
        console.error('Error adding comment:', error)
      }
    },
  },
})
