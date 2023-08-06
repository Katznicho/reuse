import { Text, View } from 'react-native';
import React from 'react';
import { useUserPreferredTheme } from '../hooks/useUserPreferredTheme';


const TextComponent = () => {

    const {reuseTheme} =  useUserPreferredTheme();

  return (
    <View style={{ marginHorizontal: 20, marginVertical: 20 }}>
      <Text style={{ color: reuseTheme.colors.preference.primaryText, fontSize: 16 }}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique
        quibusdam a voluptas voluptatibus nemo asperiores! Doloremque in,
        dignissimos odio explicabo esse magni iste! Earum vero unde culpa nemo
        placeat sed facilis adipisci laudantium neque, pariatur reprehenderit
        repudiandae quo minus animi totam ipsa odit. Tempore quo a commodi optio
        consectetur natus, deserunt iste eaque accusantium minus mollitia fugiat
        adipisci iusto alias soluta. Voluptas amet quasi praesentium, facere,
        quas autem laborum beatae facilis tempore in assumenda dicta magni et
        dolorum pariatur. Veritatis in excepturi nam quisquam? Explicabo, error
        a atque earum, vel dolorum perspiciatis commodi, eos aliquam provident
        aspernatur rerum nemo necessitatibus! Lorem ipsum dolor sit amet
        consectetur, adipisicing elit. Laboriosam expedita quae sunt inventore
        aliquid possimus fuga esse ducimus velit itaque odio officiis saepe
        corrupti aliquam cupiditate accusantium quos aspernatur unde,
        voluptatibus voluptatem eius, pariatur tempora. Vel sed explicabo eos
        eveniet sunt? Atque laudantium perferendis cum magni aperiam, ab,
        exercitationem porro ad sequi labore repudiandae, obcaecati itaque quas.
        Maxime voluptas corrupti quaerat, sunt unde qui. Voluptas dolore omnis
        sit, minima delectus nisi necessitatibus provident ipsa porro, eaque
        iure reiciendis laborum vero? Accusantium provident voluptates a
        voluptatum mollitia molestias distinctio dignissimos. Id ratione odit
        provident incidunt perspiciatis quod iure facere minima numquam? Lorem
        ipsum, dolor sit amet consectetur adipisicing elit. Molestias excepturi
        illum quisquam repellendus molestiae cum consequuntur, porro totam
        beatae iusto in autem nulla! Cupiditate omnis quidem repellat
        perferendis eius? At inventore, maxime harum ullam laborum facilis quod
        sint quia vitae sapiente vero consequatur sunt dolore praesentium
        doloremque, explicabo unde ducimus? Sunt iste maxime eos libero
        quibusdam facilis odit tempora alias voluptas ipsam laborum consectetur
        eligendi perspiciatis sed aliquam incidunt nobis quidem impedit
        cupiditate, doloremque qui veniam? Iusto facere minus consectetur qui
        tempora enim, dolorum quibusdam quo quaerat, animi repudiandae quis
        nisi, dolore rem pariatur natus debitis aut fuga! Illum, fugiat!
      </Text>
    </View>
  );
};

export default TextComponent;
