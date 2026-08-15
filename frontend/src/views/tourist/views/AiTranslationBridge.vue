<template>
  <div class="ai-bridge-view animate-fade-in">
    <div class="section-title-box">
      <h2 class="view-heading">AI Medical & Multilingual Translation Studio</h2>
      <p class="view-subheading">Enter health complaints in English, Mandarin, or Korean. Our NLP engine translates them into structured Indonesian therapist cards with allergy and medical safety alerts.</p>
    </div>

    <div class="bridge-trigger-card">
      <h3 class="card-title">Customize Your Treatment Instructions</h3>
      <p class="card-desc">
        Configure pressure points (neck, shoulders, lower back), pressure intensity (gentle, moderate, deep tissue), and declare medical sensitivities (nut oil allergies, pregnancy) so local practitioners can treat you safely.
      </p>

      <button class="btn-open-studio" @click="isAiTranslatorOpen = true">
        Open AI Translation Studio →
      </button>
    </div>

    <!-- Examples of Translated Cards -->
    <div class="examples-grid">
      <div class="example-card">
        <span class="ex-badge">EXAMPLE: ENGLISH</span>
        <h4 class="ex-input">"Lower back stiffness, peanut oil allergy"</h4>
        <span class="arrow-down">AI-Generated Indonesian Brief:</span>
        <p class="ex-output">"Tolong hindari minyak kacang (gunakan minyak zaitun/kelapa murni). Fokus pijat pinggang bawah dengan teknik relaksasi bertahap."</p>
      </div>

      <div class="example-card">
        <span class="ex-badge">EXAMPLE: MANDARIN</span>
        <h4 class="ex-input">"肩颈酸痛，力度要中等，不要按脊椎骨"</h4>
        <span class="arrow-down">AI-Generated Indonesian Brief:</span>
        <p class="ex-output">"Bahu dan leher tegang. Tekanan sedang. Hindari penekanan langsung pada ruas tulang belakang."</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useZenturaStore } from '../../../composables/useZenturaStore';

const { isAiTranslatorOpen } = useZenturaStore();
</script>

<style scoped>
.ai-bridge-view {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.section-title-box {
  margin-bottom: 0.25rem;
}

.view-heading {
  font-size: 1.3rem;
  font-weight: 800;
  color: #0f172a;
  margin-bottom: 0.3rem;
  letter-spacing: -0.02em;
}

.view-subheading {
  font-size: 0.84rem;
  color: #64748b;
  line-height: 1.55;
}

.bridge-trigger-card {
  padding: 2.25rem 1.75rem;
  border-radius: var(--radius-lg);
  background: #ffffff;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 20px -2px rgba(30, 58, 138, 0.06);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.card-title {
  font-size: 1.2rem;
  font-weight: 800;
  color: #0f172a;
  margin-bottom: 0.45rem;
}

.card-desc {
  font-size: 0.86rem;
  color: #475569;
  max-width: 580px;
  line-height: 1.6;
  margin-bottom: 1.75rem;
}

.btn-open-studio {
  background: linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 100%);
  color: #ffffff;
  font-size: 0.9rem;
  font-weight: 700;
  padding: 0.75rem 1.75rem;
  border-radius: var(--radius-xs);
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(29, 78, 216, 0.25);
  transition: all 0.15s ease;
}

.btn-open-studio:hover {
  background: #0f172a;
  transform: translateY(-1px);
}

.examples-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.example-card {
  padding: 1.5rem;
  border-radius: var(--radius-lg);
  background: #ffffff;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 20px -2px rgba(30, 58, 138, 0.06);
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}

.ex-badge {
  font-size: 0.7rem;
  font-weight: 800;
  color: #1e3a8a;
  letter-spacing: 0.04em;
}

.ex-input {
  font-size: 0.88rem;
  color: #0f172a;
  font-style: italic;
  margin: 0;
}

.arrow-down {
  font-size: 0.74rem;
  color: #64748b;
  font-weight: 700;
  margin-top: 0.35rem;
}

.ex-output {
  font-size: 0.84rem;
  color: #0f172a;
  font-weight: 600;
  margin: 0;
  background: #f8fafc;
  padding: 0.65rem 0.85rem;
  border-radius: var(--radius-xs);
  border: 1px solid #e2e8f0;
  line-height: 1.45;
}

@media (max-width: 768px) {
  .examples-grid {
    grid-template-columns: 1fr;
  }
}
</style>
