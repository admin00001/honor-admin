<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="playerList"
      border
      fit
    >
      <el-table-column
        label="id"
        align="center"
      >
      <template v-slot="{row}">
        {{row.id}}
      </template>
      </el-table-column>

      <el-table-column
        label="账户名"
        align="center"
      >
      <template v-slot="{row}">
        {{row.accountname}}
      </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total > 0"
      :page.sync="pager.page"
      :limit.sync="pager.limit"
      :total="total"
      @pagination="getList"
      />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { getPlayers } from '@/api/players'
import { Player } from '@/api/types'
import Pagination from '@/components/Pagination/index.vue'
@Component({
  name: 'playerList',
  components: {
    Pagination
  }
})
export default class extends Vue {
  private listLoading = true
  private playerList:Player[] = []
  private total = 0
  private pager = {
    page: 1,
    limit: 10
  }

  created() {
    this.getList()
  }

  async getList() {
    this.listLoading = true
    const { data } = await getPlayers(this.pager)
    this.playerList = data.players
    this.total = data.total
    this.listLoading = false
  }
}
</script>

<style lang="scss" scoped>
</style>
