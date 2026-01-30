import { defineStore } from 'pinia'

export const useDesignerStore = defineStore('designer', {
  state: () => ({
    layout: [] as layoutChildItem[],
    gridConfig: {
      colNum: 24,
      rowHeight: 30,
      margin: [10, 10],
    },
    selectedWidgetId: '',
  }),
  getters: {
    selectedConfig: (state) => {
      const selectedWidget = state.layout.find(obj => obj.i === state.selectedWidgetId)
      if (!selectedWidget) {
        return null
      }
      return selectedWidget.config || {}
    },
    getGridLayout: (state) => {
      const layout = JSON.parse(sessionStorage.getItem('layout') || '[]') || state.layout
      return layout
    },
  },
  actions: {
    addWidget(widget: layoutChildItem) {
      this.layout.push(widget)
    },
    removeWidget(id: string) {
      this.layout = this.layout.filter(obj => obj.i !== id)
      if (this.selectedWidgetId === id) {
        this.selectedWidgetId = ''
      }
    },
    clearAllWidgets() {
      this.layout = []
      this.selectedWidgetId = ''
    },
    setSelectedWidgetId(id: string) {
      this.selectedWidgetId = id
    },
    updateLayout(newLayout: layoutChildItem[]) {
      this.layout = newLayout
    },
    saveLayout(newLayout: layoutChildItem[]) {
      this.layout = newLayout
      sessionStorage.setItem('layout', JSON.stringify(this.layout))
    },
  },
})
