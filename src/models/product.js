export default {
  state: {
    entities: []
  },
  reducers: {
    successGetEntities(state, entities) {
      return {
        ...state,
        entities: entities
      }
    }
  },
  effects: (dispatch) => ({
    async getEntities(payload, rootState) {
      dispatch.product.successGetEntities([{
        code: 'C8H9NO2',
        description: 'Paracetamol',
        currency: 'USD',
        cost: 45
      }])
    }
  })
}
