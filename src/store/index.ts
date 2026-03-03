import { defineStore } from 'pinia'

export const useDesignerStore = defineStore('designer', {
  state: () => ({
    layout: [] as LayoutItem[],
    gridConfig: {
      colNum: 24,
      rowHeight: 30,
      margin: [10, 10],
    },
    selectedWidgetId: '',
  }),
  actions: {
    addWidget(widget: DragWidget) {
      this.layout.push(widget as LayoutItem)
    },
    removeWidget(id: string) {
      this.layout = this.layout.filter(obj => obj.i !== id)
      if (this.selectedWidgetId === id) {
        this.selectedWidgetId = ''
      }
    },
    setSelectedWidgetId(id: string) {
      this.selectedWidgetId = id
    },
    clearAllLayout() {
      this.layout = []
      this.selectedWidgetId = ''
    },
    updateLayout(newLayout: LayoutItem[]) {
      this.layout = newLayout
    },
  },
})
