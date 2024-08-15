 <template>
<v-stepper :items="['Tipo', 'Form', 'Fotos', 'Preview']">
  <template v-slot:item.1>
    <v-card title="Tipo">

      <v-select 
      v-model="form"
      label="Select"
      :items="['generico', 'parmegiana1', 'vinho1']"
      />

    </v-card>
  </template>

  <template v-slot:item.2>

    <!-- generico -->
    <v-card title="Generico" v-if="form == 'generico'">
      <v-text-field
          v-model="restaurante"
          label="restaurante"
          required
        ></v-text-field>
        <v-text-field
          v-model="prato"
          label="Prato"
        ></v-text-field>
        <v-text-field
          v-model="price"
          label="price"
          type="number"
          prefix="R$"
        ></v-text-field>
        <div class="text-caption">Rating - {{ rating_personal }}</div>
        <v-slider
          :max="3"
          :min="1"
          show-ticks="always"
          step="1"
          tick-size="4"
          :ticks="tickLabelsPessoal"
          v-model="rating_personal"
        ></v-slider>
        <v-textarea v-model="description" />

    </v-card>

    <!-- parmegiana1 -->
    <v-card title="Parmegiana v1" v-if="form == 'parmegiana1'">
      <FoodratingParmegianaV1 v-model="parme"/>

    </v-card>

    <!-- vinho1 -->
    <v-card title="Vinho v1" v-if="form == 'vinho1'">


    </v-card>
  </template>

  <template v-slot:item.3>
    <v-card title="Cloudinary">

      <FoodratingCloudinaryUpload v-model="form" />


</v-card>

  </template>

  <template v-slot:item.4>
    <v-card title="Preview">


</v-card>

  </template>

</v-stepper>

</template>

<script setup>

const form = ref(null)
const parme = reactive({})
const tickLabelsPessoal = {
  1: "Abaixo",
  2: "Bom",
  3: "Repetiria",
};




</script>