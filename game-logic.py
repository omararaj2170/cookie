import json
import random

buildings = []

for i in range(20):
    name = f"{random.choice(['Quantum', 'Mystic', 'Solar', 'Neon', 'Arcane'])} {random.choice(['Forge','Tower','Lab','Station','Factory'])}"
    buildings.append({
        "name": name,
        "cost": random.randint(50, 5000),
        "cps": round(random.uniform(0.1, 50), 2),
        "owned": 0
    })

print(json.dumps(buildings))
