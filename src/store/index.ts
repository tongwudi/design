import { defineStore } from 'pinia'
import { cardConfig, componentsList } from '@/components/index'

export const useDesignerStore = defineStore('designer', {
  state: () => ({
    componentsList: Object.freeze(componentsList),
    layout: [] as LayoutItem[],
    gridConfig: {
      colNum: 24,
      rowHeight: 30,
      margin: [10, 10],
    },
    selectedWidgetId: '',
  }),
  getters: {
    getComponentList: (state) => {
      return state.componentsList
    },
    getSelectedConfig: (state) => {
      const selectedWidget = state.layout.find(obj => obj.i === state.selectedWidgetId)
      if (!selectedWidget) {
        return
      }
      return selectedWidget.config
    },
  },
  actions: {
    addWidget(widget: DragWidget) {
      this.layout.push(widget as LayoutItem)
    },
    updateWidget(id: string, newWidget: DragWidget) {
      const index = this.layout.findIndex(obj => obj.i === id)
      const obj = this.layout[index] as LayoutItem
      const widget = {
        ...newWidget,
        config: {
          card: { ...cardConfig[obj.category]?.[obj.key] },
        },
      }
      this.layout[index] = widget
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
    updateConfig(newConfig: DefaultConfig) {
      const index = this.layout.findIndex(obj => obj.i === this.selectedWidgetId)
      if (index === -1) {
        return
      }
      this.layout[index]!.config = { ...newConfig }
    },
    clearAllLayout() {
      this.layout = []
      this.selectedWidgetId = ''
    },
    updateLayout(newLayout: LayoutItem[]) {
      this.layout = newLayout
    },
    saveLayout() {
      sessionStorage.setItem('LAYOUT', JSON.stringify(this.layout))
    },
    getLayout() {
      return JSON.parse(sessionStorage.getItem('LAYOUT') || '[]') || this.layout
    },
  },
})
