import { defineStore } from 'pinia'

export const useDesignerStore = defineStore('designer', {
  state: () => ({
    layout: [] as LayoutItem[],
    gridConfig: {
      colNum: 24,
      rowHeight: 30,
      margin: [10, 10],
    },
    selectedId: '',
  }),
  actions: {
    addWidget(component: LayoutItem) {
      this.layout.push(component)
    },
    removeWidget(id: string) {
      this.layout = this.layout.filter(obj => obj.i !== id)
      if (this.selectedId === id) {
        this.selectedId = ''
      }
    },
    setSelectedId(id: string) {
      this.selectedId = id
    },
    clearAllLayout() {
      this.layout = []
      this.selectedId = ''
    },
    updateLayout(newLayout: LayoutItem[]) {
      this.layout = newLayout
    },
  },
})
