

<style scoped>
.device-management {
  padding: 20px;
  font-family: Arial, sans-serif;
}

.form-container {
  margin-bottom: 20px;
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 5px;
}

.form-container label {
  display: block;
  margin-bottom: 5px;
}

.form-container input {
  width: 100%;
  padding: 8px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 3px;
}

.form-container button {
  padding: 8px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  margin-right: 20px;
}

.search-container {
  margin-bottom: 20px;
}

.search-container input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 3px;
  margin-right: 10px;
}

.search-container button {
  padding: 8px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

.table-container table {
  width: 100%;
  border-collapse: collapse;
}

.table-container th,
.table-container td {
  border: 1px solid #dddfe2;
  padding: 8px;
  text-align: left;
}

.table-container th {
  background-color: #2f3131;
}

.pagination-container {
  margin-top: 20px;
  text-align: center;
}

.pagination-container button {
  padding: 8px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  margin: 0 5px;
}

.pagination-container button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.export-container {
  margin-top: 20px;
  text-align: center;
}

.export-container button {
  padding: 8px 15px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}
</style>    

<template>
  <div class="device-management">
    <!-- 表单输入 -->
    <div class="form-container">
      <h2>添加设备信息</h2>
      <form @submit.prevent="addDevice">
        <label for="deviceName">设备名:</label>
        <input
          type="text"
          id="deviceName"
          v-model="formData.deviceName"
          placeholder="请输入设备名"
        />
        <label for="deviceIp">设备 IP:</label>
        <input type="text" id="deviceIp" v-model="formData.deviceIp" placeholder="请输入设备 IP" />
        <button type="submit">添加</button>
        <button type="button" @click="searchDevices">搜索</button>
      </form>
    </div>
    <!-- 设备信息列表 -->
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>设备名称</th>
            <th>设备 IP</th>
            <th>设备添加人</th>
            <th>设备添加时间</th>
            <th>设备状态</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="device in filteredDevices.slice(
              (currentPage - 1) * pageSize,
              currentPage * pageSize
            )"
            :key="device.uin"
          >
            <td>{{ device.deviceData.Name }}</td>
            <td>{{ device.deviceData.Ip }}</td>
            <td>{{ device.deviceData.AddName }}</td>
            <td>{{ device.deviceData.Time }}</td>
            <td>{{ device.deviceData.Status }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 分页组件 -->
    <div class="pagination-container">
      <button @click="prevPage" :disabled="currentPage === 1">上一页</button>
      <span>{{ currentPage }} / {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">下一页</button>
    </div>

    <!-- 导出 CSV 按钮 -->
    <div class="export-container">
      <button @click="exportToCsv">导出为 CSV</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
// import Papa from 'papaparse';

export default {
  data() {
    return {
      formData: {
        deviceName: '',
        deviceIp: '',
      },
      devices: [],
      searchQuery: '',
      currentPage: 1,
      pageSize: 5,
      filteredDevices: [],
    }
  },
  computed: {
    totalPages() {
      return Math.ceil(this.filteredDevices.length / this.pageSize)
    },
  },
  methods: {
    fetchDevices() {
      axios
        .get('http://127.0.0.1:8080/device/list')
        .then((response) => {
          this.devices = response.data
          this.filteredDevices = [...this.devices]
        })
        .catch((error) => {
          console.error('获取设备列表失败:', error)
        })
    },
    addDevice() {
      if (this.formData.deviceName && this.formData.deviceIp) {
        const formData = new URLSearchParams()
        formData.append('uin', 1)
        formData.append('name', this.formData.deviceName)
        formData.append('ip', this.formData.deviceIp)

        axios
          .post('http://127.0.0.1:8080/device/add', formData, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          })
          .then(() => {
            this.fetchDevices()
            this.formData.deviceName = ''
            this.formData.deviceIp = ''
          })
          .catch((error) => {
            console.error('添加设备失败:', error)
          })
      }
    },
    searchDevices() {
      const queryParams = {}
      if (this.formData.deviceName) {
        queryParams.name = this.formData.deviceName
      }
      if (this.formData.deviceIp) {
        queryParams.ip = this.formData.deviceIp
      }

      const queryString = new URLSearchParams(queryParams).toString()
      console.log('queryString:', queryString)
      axios
        .get(`http://127.0.0.1:8080/device/search?${queryString}`)

        .then((response) => {
          console.log('response:', response.data)
          this.filteredDevices = response.data
        })
        .catch((error) => {
          console.error('搜索设备失败:', error)
        })

      this.currentPage = 1
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++
      }
    },
    exportToCsv() {
      // const csv = Papa.unparse(this.filteredDevices);
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
      const link = document.createElement('a')
      const url = URL.createObjectURL(blob)
      link.setAttribute('href', url)
      link.setAttribute('download', '设备信息.csv')
      link.style.visibility = 'hidden'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    },
  },
  // 生命周期函数
  mounted() {
    this.fetchDevices()
  },
}
</script>
