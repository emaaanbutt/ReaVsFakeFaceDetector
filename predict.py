import sys
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import numpy as np

model = load_model("real-vs_-fake-model.h5")

img_path = sys.argv[1]
img = image.load_img(img_path, target_size=(128, 128))
x = image.img_to_array(img) / 255.0
x = np.expand_dims(x, axis=0)

pred = model.predict(x)[0][0]

if pred > 0.5:
    print("real")
else:
    print("fake")
