<template>
  <div class="categories-wrapper">
    <div class="search-bar-wrap">
      <input
        type="text"
        v-model="searchQuery"
        class="search-input"
        placeholder="Search spas by name, terminal landmark, or bodywork service..."
      />
      <button v-if="searchQuery" class="clear-search-btn" @click="searchQuery = ''">✕</button>
    </div>

    <!-- Category Pills Scroll in English -->
    <div class="category-pills">
      <button
        v-for="cat in categories"
        :key="cat.id"
        class="category-pill"
        :class="{ active: selectedCategory === cat.id }"
        @click="selectedCategory = cat.id"
      >
        <span class="cat-name">{{ cat.name }}</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { useLokaBatamStore } from '../../composables/useLokaBatamStore';
import { MOCK_CATEGORIES } from '../../data/mockSalons';

const { selectedCategory, searchQuery } = useLokaBatamStore();
const categories = MOCK_CATEGORIES;
</script>

<style scoped>
.categories-wrapper {
  margin-bottom: 1.25rem;
}

.search-bar-wrap {
  position: relative;
  margin-bottom: 0.85rem;
}

.search-input {
  width: 100%;
  padding: 0.65rem 2.4rem 0.65rem 1rem;
  background: #ffffff;
  border: 1px solid #cbd5e1;
  border-radius: var(--radius-sm);
  color: #0f172a;
  font-size: 0.86rem;
  font-family: inherit;
  outline: none;
  transition: border-color 0.15s;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
}

.search-input:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.clear-search-btn {
  position: absolute;
  right: 0.85rem;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  color: #94a3b8;
  cursor: pointer;
  font-size: 0.84rem;
}

.category-pills {
  display: flex;
  gap: 0.45rem;
  overflow-x: auto;
  padding-bottom: 4px;
  scrollbar-width: none;
}

.category-pills::-webkit-scrollbar {
  display: none;
}

.category-pill {
  display: flex;
  align-items: center;
  padding: 0.4rem 0.85rem;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: var(--radius-xs);
  color: #475569;
  font-size: 0.78rem;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.15s;
  flex-shrink: 0;
}

.category-pill:hover {
  background: #eff6ff;
  color: #1e3a8a;
  border-color: #bfdbfe;
}

.category-pill.active {
  background: #1e3a8a;
  border-color: #1e3a8a;
  color: #ffffff;
  font-weight: 700;
  box-shadow: 0 2px 6px rgba(30, 58, 138, 0.2);
}
</style>
