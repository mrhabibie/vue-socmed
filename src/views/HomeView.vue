<template>
  <div class="min-h-screen bg-gray-100">
    <nav class="bg-white shadow-sm">
      <div class="max-w-5xl mx-auto px-4 py-3 flex justify-between items-center">
        <h1 class="text-xl font-bold">Social Media App</h1>
        <button @click="authStore.logout" class="text-gray-600 hover:text-gray-800">Logout</button>
      </div>
    </nav>

    <main class="max-w-2xl mx-auto px-4 py-8">
      <!-- Create Post -->
      <div class="bg-white rounded-lg shadow-sm p-4 mb-6">
        <textarea
          v-model="newPostContent"
          placeholder="What's on your mind?"
          class="w-full p-2 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="3"
        ></textarea>
        <div class="mt-3 flex justify-between items-center">
          <input
            type="file"
            @change="handleImageSelect"
            accept="image/*"
            class="text-sm text-gray-500"
          />
          <button
            @click="createPost"
            class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Post
          </button>
        </div>
      </div>

      <!-- Posts List -->
      <div class="space-y-6">
        <div
          v-for="post in postStore.posts"
          :key="post._id"
          class="bg-white rounded-lg shadow-sm p-4"
        >
          <div class="flex justify-between items-start mb-4">
            <div>
              <h3 class="font-semibold">{{ post.userId.username }}</h3>
              <p class="text-sm text-gray-500">
                {{ new Date(post.createdAt).toLocaleDateString() }}
              </p>
            </div>
            <div v-if="post.userId._id === authStore.user._id" class="flex space-x-2">
              <button @click="startEditing(post)" class="text-gray-500 hover:text-blue-500">
                Edit
              </button>
              <button @click="deletePost(post._id)" class="text-red-500 hover:text-red-600">
                Delete
              </button>
            </div>
          </div>

          <div v-if="editingPost?._id === post._id">
            <textarea
              v-model="editingPost.content"
              class="w-full p-2 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
            ></textarea>
            <div class="flex justify-end space-x-2">
              <button @click="cancelEditing" class="px-4 py-2 text-gray-400 hover:text-gray-300">
                Cancel
              </button>
              <button
                @click="saveEdit"
                class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </div>
          <template v-else>
            <p class="mb-4">{{ post.content }}</p>
            <img
              v-if="post.image"
              :src="`${apiURL}${post.image}`"
              class="rounded-lg max-h-96 w-full object-cover mb-4"
            />
          </template>

          <div class="flex items-center space-x-4 mb-4">
            <button
              @click="likePost(post._id)"
              class="flex items-center space-x-1 text-gray-500 hover:text-blue-500"
            >
              <span>{{ post.likes.length }} Likes</span>
            </button>
            <button
              @click="post.showComments = !post.showComments"
              class="text-gray-500 hover:text-blue-500"
            >
              {{ post.comments.length }} Comments
            </button>
          </div>

          <div v-if="post.showComments" class="space-y-4">
            <div
              v-for="comment in post.comments"
              :key="comment._id"
              class="bg-gray-50 p-3 rounded-lg"
            >
              <div class="flex justify-between">
                <span class="font-semibold">{{ comment.userId.username }}</span>
                <span class="text-sm text-gray-500">
                  {{ new Date(comment.createdAt).toLocaleDateString() }}
                </span>
              </div>
              <p class="mt-1">{{ comment.content }}</p>
            </div>

            <div class="flex space-x-2">
              <input
                v-model="newComments[post._id]"
                placeholder="Write a comment..."
                class="flex-1 p-2 border rounded-lg"
              />
              <button
                @click="addComment(post._id)"
                class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Comment
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Load More -->
      <div v-if="postStore.hasMore" class="text-center mt-6">
        <button
          @click="postStore.fetchPosts"
          class="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300"
          :disabled="postStore.loading"
        >
          {{ postStore.loading ? 'Loading...' : 'Load More' }}
        </button>
      </div>
      <p v-else class="text-center mt-6 text-gray-500">No more posts to load</p>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { usePostStore } from '@/stores/posts'
import { ref, onMounted } from 'vue'

const apiURL = import.meta.env.VITE_API_URL

const authStore = useAuthStore()
const postStore = usePostStore()

const newPostContent = ref('')
const selectedImage = ref<File | null>(null)
const newComments = ref<{ [key: string]: string }>({})
const editingPost = ref<null | { _id: string, content: string }>(null);

onMounted(() => {
  postStore.fetchPosts()
})

const handleImageSelect = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files[0]) {
    selectedImage.value = input.files[0]
  }
}

const createPost = async () => {
  if (newPostContent.value.trim()) {
    await postStore.createPost(newPostContent.value, selectedImage.value || undefined)
    newPostContent.value = ''
    selectedImage.value = null
  }
}

const startEditing = (post: { _id: string, content: string }) => {
  editingPost.value = {
    _id: post._id,
    content: post.content
  };
};

const cancelEditing = () => {
  editingPost.value = null;
};

const saveEdit = async () => {
  if (editingPost.value && editingPost.value.content.trim()) {
    await postStore.editPost(editingPost.value._id, editingPost.value.content);
    editingPost.value = null;
  }
};

const deletePost = async (postId: string) => {
  await postStore.deletePost(postId)
}

const likePost = async (postId: string) => {
  await postStore.likePost(postId)
}

const addComment = async (postId: string) => {
  if (newComments.value[postId]?.trim()) {
    await postStore.addComment(postId, newComments.value[postId])
    newComments.value[postId] = ''
  }
}
</script>
