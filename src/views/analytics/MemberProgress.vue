<template>
  <div>
    <vs-row vs-justify="center">
      <vs-col vs-sm="12" vs-lg="12">
        <span @click="LinkToBack()" style="cursor: pointer;" class="ml-2 mb-5 mt-2 primary-font"><i class="ti-angle-left" style="font-size: 14px;"></i> All Members</span>
        <h2 class="mt-3" style="color: #333; font-weight: 600">Memeber Progress: producttitle</h2>
        <br />
      </vs-col>
    </vs-row>
    <vs-row vs-justify="center">
      <vs-col type="flex" vs-justify="center" vs-align="center" vs-lg="6" vs-sm="12" code-toggler>
        <vs-card actionable class="cardx">
          <div class="d-flex" style="align-items: center">
            <div>
                <vs-avatar size="100px"></vs-avatar>
            </div>
            <div class="ml-3">
              <h4 class="mb-2">{{current_student_progress.student.name}}</h4>
              <div>
                <a :href="mail_current_student">{{current_student_progress.student.email}}</a>
              </div>
              <div>
                <strong>Progress</strong>: {{total_progress}} %
              </div>
              <div>
                <strong>Last Login</strong>: {{current_student_progress.student.last_activity}}
              </div>
            </div>
          </div>
        </vs-card>
        <vs-card>
          <div class="">
            <vs-table
              v-model="selected_category"
              @selected="handleSelected"
              @dblSelection="doubleSelection"
              :data="current_student_progress.progress"
            >
              <template slot="thead">
                <vs-th>CATEGORIES</vs-th>
                <vs-th>PROGRESS</vs-th>                
              </template>

              <template slot-scope="{ data }">
                <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
                  <vs-td>{{
                    data[indextr].name
                  }}</vs-td>

                  <vs-td>{{
                    data[indextr].completed
                  }} %</vs-td>
                
                </vs-tr>
              </template>
            </vs-table>
          </div>

          <!-- <div class="p-3 bg-light shadow w-100 mt-3">
            <pre>{{ selected }}</pre>
          </div> -->
        </vs-card>
      </vs-col>
      <vs-col type="flex" vs-justify="center" vs-align="center" vs-lg="6" vs-sm="12">
        <vs-card actionable class="cardx">
         <div class="d-flex" style="justify-content: space-between">
          <h5>Let's Get Started</h5>
          <div>Completed {{completed_lessons}} of {{selected_category.lessons.length}} Lessons</div>
         </div>
         <vs-divider></vs-divider>
         <vs-row vs-align="center" vs-justify="center" style="justify-content: center" class="mt-3 mb-3" v-bind:key="index" v-for="(data, index) in selected_category.lessons">
           <vs-col vs-lg="3" class="text-center">
             <div
              class="lesson_image"
              v-bind:style="getLessonThumbnailUrl(data.thumbnail)"              
            ></div>
           </vs-col>
           <vs-col vs-lg="7">
              <div>
                <i class="mdi mdi-play-circle"></i>
                {{data.title}}
              </div>
             <vs-progress :percent="data.completed" color="primary">primary</vs-progress>
           </vs-col>
           <vs-col vs-lg="2" class="text-center">{{data.completed}}%</vs-col>
         </vs-row>
        </vs-card>

      </vs-col>

    </vs-row>
  </div>
</template>

<script>

export default {
  name : 'MemberProgress',
  data: () => ({
    
    testdata: [1,2,3,4],
   
    selected_category: [],
    // cssthumbImageUrl: 'url(../../assets/images/image-preview.png)',
  }),
  // watch: {
  //   selected_category : function(newValue) {
  //     console.log('selected category', newValue)
  //   }
  // },
  computed: {
    product_id: {
      get() {
        var id = this.$route.params.product_id
        return id.slice(0, id.length);
      }
    },

    student_id: {
      get() {
        var id = this.$route.params.student_id
        return id.slice(0, id.length)
      }
    },
    current_student_progress: {
      get() {
        return this.$store.state.productManage.current_student_progress
      }
    },

    mail_current_student: {
      get() {
        return "mailto:" + this.current_student_progress.student.email;
      }
    },
    completed_lessons: {
      get() {
        let completed = 0;
        for (let i = 0; i < this.selected_category.lessons.length; i++) {
          if (this.selected_category.lessons[i].completed == 100) {
            completed++;
          }
        }
        return completed
      }
    },

    total_progress: {
      get() {
        let progress = 0;
        for (let i = 0; i < this.current_student_progress.progress.length; i++) {
          progress += this.current_student_progress.progress[i].completed
        }
        progress = progress/this.current_student_progress.progress.length;
        return Math.floor(progress)
      }
    }
  },
  created(){
    this.getStudentProgress(this.product_id, this.student_id)
  },
  methods: {
    LinkToBack() {
      this.$router.push('/analytics/product-progress/' + this.product_id)
    },
    handleSelected() {

    },
    doubleSelection() {

    },
    getLessonThumbnailUrl(thumbnail) {
      return  "background-image: url(" + thumbnail + ")"
    },

    getStudentProgress(product_id, student_id) {
      this.$store.dispatch('productManage/getStudentProgress', [product_id, student_id]).then(()=>{
        if (this.current_student_progress.progress != undefined) {
          this.selected_category = this.current_student_progress.progress[0]
        }
      })
    },

    setLessons(category_index) {
      alert(category_index)
    }

  }

}
</script>
<style>
table tr td {
  text-align: center;
}
th .sort-th, th .vs-table-text {
  justify-content: center;
}
.lesson_image {
  border: 1px rgba(0, 0, 0, 0.2) solid;
  /* border-radius: 5px; */
  overflow: hidden;
  width: 100%;
  height: 0;
  padding-top: 56.25%;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
}
</style>
