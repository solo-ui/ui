<script setup lang="ts">
import { computed, ref } from 'vue'

type InboxItem = {
  id: number
  text: string
}

type FinanceEntry = {
  id: number
  amount: number
  reason: string
  type: 'income' | 'expense'
}

const inboxInput = ref('')
const inboxItems = ref<InboxItem[]>([])
const tasks = ref<string[]>([])

const amountInput = ref('')
const reasonInput = ref('')
const financeEntries = ref<FinanceEntry[]>([])

function addInboxItem() {
  const value = inboxInput.value.trim()

  if (!value) {
    return
  }

  inboxItems.value.push({
    id: Date.now(),
    text: value
  })

  inboxInput.value = ''
}

function convertToTask(id: number) {
  const index = inboxItems.value.findIndex(item => item.id === id)

  if (index === -1) {
    return
  }

  const [item] = inboxItems.value.splice(index, 1)

  if (item) {
    tasks.value.push(item.text)
  }
}

const parsedAmount = computed(() => {
  const amount = Number(amountInput.value.replace(',', '.'))

  return Number.isFinite(amount) ? amount : NaN
})

function addFinanceEntry(type: 'income' | 'expense') {
  const amount = parsedAmount.value
  const reason = reasonInput.value.trim()

  if (!Number.isFinite(amount) || amount <= 0 || !reason) {
    return
  }

  financeEntries.value.unshift({
    id: Date.now(),
    amount,
    reason,
    type
  })

  amountInput.value = ''
  reasonInput.value = ''
}

function formatAmount(amount: number) {
  return new Intl.NumberFormat('el-GR', {
    maximumFractionDigits: 2,
    minimumFractionDigits: Number.isInteger(amount) ? 0 : 2
  }).format(amount)
}
</script>

<template>
  <main class="min-h-screen bg-[#f5f0e6] px-4 py-16 text-black">
    <div class="mx-auto w-full max-w-[900px] space-y-6">
      <h1 class="text-center text-3xl font-semibold tracking-tight">
        Personal OS V25
      </h1>

      <section class="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
        <h2 class="mb-4 text-xl font-semibold">
          Inbox → Convert Flow
        </h2>

        <div class="space-y-3">
          <input
            v-model="inboxInput"
            type="text"
            placeholder="γράψε κάτι…"
            class="w-full rounded-lg border border-neutral-300 px-4 py-3 text-base outline-none transition focus:border-black"
            @keydown.enter="addInboxItem"
          >

          <button
            class="rounded-md bg-black px-4 py-2 text-sm font-medium text-white"
            @click="addInboxItem"
          >
            Προσθήκη
          </button>
        </div>

        <div class="mt-6 space-y-2">
          <div
            v-for="item in inboxItems"
            :key="item.id"
            class="flex items-center justify-between rounded-lg border border-neutral-200 px-3 py-2"
          >
            <span>{{ item.text }}</span>
            <button class="rounded-md border border-neutral-300 px-3 py-1 text-sm" @click="convertToTask(item.id)">
              → Task
            </button>
          </div>
        </div>
      </section>

      <section class="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
        <h2 class="mb-4 text-xl font-semibold">
          Tasks
        </h2>

        <div class="space-y-2">
          <p v-if="!tasks.length" class="text-sm text-neutral-500">
            Δεν υπάρχουν ακόμα tasks.
          </p>
          <div v-for="(task, index) in tasks" :key="`${task}-${index}`" class="rounded-lg border border-neutral-200 px-3 py-2">
            {{ task }}
          </div>
        </div>
      </section>

      <section class="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
        <h2 class="mb-4 text-xl font-semibold">
          Finance
        </h2>

        <div class="space-y-3">
          <input
            v-model="amountInput"
            type="text"
            inputmode="decimal"
            placeholder="Ποσό"
            class="w-full rounded-lg border border-neutral-300 px-4 py-3 text-base outline-none transition focus:border-black"
          >
          <input
            v-model="reasonInput"
            type="text"
            placeholder="Λόγος"
            class="w-full rounded-lg border border-neutral-300 px-4 py-3 text-base outline-none transition focus:border-black"
            @keydown.enter="addFinanceEntry('expense')"
          >

          <div class="flex gap-3">
            <button class="rounded-md bg-black px-4 py-2 text-sm font-medium text-white" @click="addFinanceEntry('expense')">
              Έξοδο
            </button>
            <button class="rounded-md bg-black px-4 py-2 text-sm font-medium text-white" @click="addFinanceEntry('income')">
              Έσοδο
            </button>
          </div>
        </div>

        <div class="mt-6 space-y-2">
          <p v-if="!financeEntries.length" class="text-sm text-neutral-500">
            Δεν υπάρχουν ακόμα εγγραφές.
          </p>
          <div
            v-for="entry in financeEntries"
            :key="entry.id"
            class="flex items-center justify-between rounded-lg border border-neutral-200 px-3 py-2"
          >
            <span>{{ entry.type === 'income' ? '+' : '-' }} {{ formatAmount(entry.amount) }}€</span>
            <span class="text-sm text-neutral-500">{{ entry.reason }}</span>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>
